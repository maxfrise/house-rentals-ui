import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { UiSpacingProps} from "@uireact/foundation";
import { Breakpoints, UiSpacing, UiViewport } from "@uireact/foundation";
import { UiViewRow } from "@uireact/view";

import styled from 'styled-components';
import type { UserFormFields} from "~/api/schemas/user.schema";
import { UserSchema } from "~/api/schemas/user.schema";
import type { MaxfriseErrors} from "~/components/dashboard/forms/validator/form-validator-yup";
import { validate } from "~/components/dashboard/forms/validator/form-validator-yup";

import { createUser } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const errors: MaxfriseErrors<UserFormFields> = await validate(
    formData,
    UserSchema
  );

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const user = await createUser(
    formData.email.toString(),
    formData.password.toString(),
    formData.name.toString(),
    formData.phone.toString()
  );
  
    return createUserSession({
    redirectTo: "/confirm",
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
