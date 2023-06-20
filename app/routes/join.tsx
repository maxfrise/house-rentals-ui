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
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

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
