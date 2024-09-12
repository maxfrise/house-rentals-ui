import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { UiViewRow } from "@uireact/view";

import type { UserFormFields} from "~/api/schemas/user.schema";
import { UserSchema } from "~/api/schemas/user.schema";
import type { MaxfriseErrors} from "~/components/dashboard/forms/validator/form-validator-yup";
import { validate } from "~/components/dashboard/forms/validator/form-validator-yup";
import { createUser } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData()) as UserFormFields;
  const errors: MaxfriseErrors<UserFormFields> = await validate(
    formData,
    UserSchema
  );

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const user = await createUser(
    formData.email,
    formData.password,
    formData.name,
    formData.phone || '',
    formData.type
  );

  return createUserSession({
    redirectTo: "/confirm",
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Crear cuenta" }];

export default function Join() {
  return (
    <UiViewRow weight='50' centeredContent>
      <Outlet />
    </UiViewRow>
  );
};
