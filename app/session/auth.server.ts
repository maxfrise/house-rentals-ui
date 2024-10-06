import { Authenticator } from "remix-auth";
import { OAuth2Profile, OAuth2Strategy } from "remix-auth-oauth2";
import { sessionStorage } from "../session.server";
import { cognitoUrl, clientId, clientSecret, callbackUrl } from "./cognito.constants"

import { User } from "./user"

let authenticator = new Authenticator<User>(sessionStorage);

const strategy = new OAuth2Strategy<User, OAuth2Profile>(
  {
    authorizationEndpoint: `${cognitoUrl}/oauth2/authorize`,
    tokenEndpoint: `${cognitoUrl}/oauth2/token`,
    clientId: clientId,
    clientSecret: clientSecret,
    redirectURI: callbackUrl,
    scopes: ["openid", "email", "profile"],
  },
  async ({ tokens }) => {
    let profile = null;

    try {
      const response = await fetch(`${cognitoUrl}/oauth2/userInfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-200 responses here
        console.error(`Error: Failed to fetch user info. Status: ${response.status}`);
      } else {
        profile = await response.json();
      }
    } catch (e) {
      console.error("There was a problem fetching user info: ", e);
    }

    const { access_token, refresh_token, id_token } = tokens;

    return { user: profile, access_token, id_token, refresh_token };
  }
)

authenticator.use(
  strategy,
  "cognito"
);

export { authenticator, strategy };
