import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../session/auth.server";
import { redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => await authenticator.logout(request, { redirectTo: "/" })

// export const loader = async () => redirect("/");

export let loader = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/")
};
