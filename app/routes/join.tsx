import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { UiSpacingProps} from "@uireact/foundation";
import { Breakpoints, UiSpacing, UiViewport } from "@uireact/foundation";
import { UiViewRow } from "@uireact/view";

import styled from 'styled-components';

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const errors = {
    email: null,
    password: null,
    name: null,
    phone: null
  };
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (typeof name !== 'string' || name.length === 0) {
    return json(
      { errors: { ...errors, name: "El nombre es requerido" } },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return json(
      { errors: { ...errors, email: "Correo electronico no es valido" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      { errors: { ...errors, email: "Ya hay una cuenta asociada con este correo" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { ...errors, password: "La contraseña es requerida" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { ...errors, password: "Contraseña muy corta, minimo 8 caracteres" } },
      { status: 400 }
    );
  }

  if (typeof phone !== 'string' || phone.length === 0 || phone.length > 10) {
    return json(
      { errors: { ...errors, phone: "El telefono no es valido" } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, name, phone);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Crear cuenta" }];

const selectorSpacing: UiSpacingProps['padding'] = { block: 'five' };
const contentSpacing: UiSpacingProps['padding'] = { all: 'five' };

const Div = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function Join() {
  return (
    <UiViewRow weight='50' centeredContent>
      <UiViewport criteria={Breakpoints.SMALL}>
        <UiSpacing padding={contentSpacing}>
          <Outlet />
        </UiSpacing>
      </UiViewport>
      <UiViewport criteria={'m|l|xl'}>
        <UiSpacing padding={selectorSpacing}>
          <Div>
            <Outlet />
          </Div>
        </UiSpacing>
      </UiViewport>
    </UiViewRow>
  );
};
