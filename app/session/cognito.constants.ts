import invariant from "tiny-invariant";

[
  "COGNITO_URL", "COGNITO_CLIENT_ID", "COGNITO_CLIENT_SECRET", "COGNITO_REDIRECT_URL"
].map((envVar) => {
  invariant(process.env[envVar], `${envVar} must be set`);
})

export const cognitoUrl = process.env.COGNITO_URL || "";
export const clientId = process.env.COGNITO_CLIENT_ID || "";
export const clientSecret = process.env.COGNITO_CLIENT_SECRET || "";
export const callbackUrl = process.env.COGNITO_REDIRECT_URL || "";