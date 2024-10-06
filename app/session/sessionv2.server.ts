import { authenticator, strategy } from "./auth.server";
import { redirect } from "@remix-run/node";
import { sessionStorage, getSession } from "../session.server";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export async function createUserSession(request: Request) {
  const user = await authenticator.authenticate("cognito", request, {
    failureRedirect: "/"
  });
  const session = await getSession(request);
  session.set(authenticator.sessionKey, {
    user: {
      name: user.user.name,
      sub: user.user.sub,
      email: user.user.email,
    },
    accessToken: user.access_token,
  });
  const headers = new Headers({ "Set-Cookie": await sessionStorage.commitSession(session) });
  return redirect("/", { headers });
}

export async function getUserV2(request: Request, failureRedirect = true) {
  let user = null

  if (failureRedirect) {
    user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/auth/login",
    });
  } else {
    user = await authenticator.isAuthenticated(request);
  }

  if (user) {
    return {
      ...user.user
    };
  }
}

export async function requireUserIdV2(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams}`,
  });

  return `email#${user.user.email}`
}

export function revokeToken(token: string) {
  strategy.revokeToken(token)
}