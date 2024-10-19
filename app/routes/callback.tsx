import type { LoaderFunctionArgs } from "@remix-run/node";
import { createUserSession } from "../session/sessionv2.server"

export let loader = async ({ request }: LoaderFunctionArgs) => {
  return createUserSession(request)
};