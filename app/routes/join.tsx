import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { UiViewRow } from "@uireact/view";

export const action = async ({ request }: ActionFunctionArgs) => {
  return json({}, { status: 400 });
};

export const meta: MetaFunction = () => [{ title: "Crear cuenta" }];

export default function Join() {
  return (
    <UiViewRow weight='50' centeredContent>
      <Outlet />
    </UiViewRow>
  );
};
