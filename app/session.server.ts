import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2"

import type { User } from "./models/user.server";
import { getUserById } from "./models/user.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://maxfrise.auth.us-west-2.amazoncognito.com/oauth2/authorize",
      tokenURL: "https://maxfrise.auth.us-west-2.amazoncognito.com/oauth2/token",
      clientID: "7akg4pgnuu8tss89ht74djv5lp",
      clientSecret: "",
      callbackURL: "https://www.maxfrise.com/callback",
      useBasicAuthenticationHeader: false, // defaults to false
    },
    async ({
      accessToken,
      refreshToken,
      extraParams,
      profile,
      context,
      request,
    }) => {
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you
      console.log("accessToken")
      console.log(accessToken)
      console.log("refreshToken")
      console.log(refreshToken)
      console.log("extraParams")
      console.log(extraParams)
      console.log("profile")
      console.log(profile)
      console.log("context")
      console.log(context)
      console.log("request")
      console.log(request)
      // return await getUser(
      //   accessToken,
      //   refreshToken,
      //   extraParams,
      //   profile,
      //   context,
      //   request
      // );
    },
  ),
  "oauthstrategy"
)

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function doAuth(request: Request) {
  console.log("DOINGATH")
  try {
    const result = await authenticator.authenticate("oauthstrategy", request);
  } catch(e) {
    console.log('there was an error')
    console.log(e)
  }
  console.log("RESULT");
  // console.log(result);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  const result = await authenticator.authenticate("oauthstrategy", request);
  console.log("RESULT");
  console.log(result);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
