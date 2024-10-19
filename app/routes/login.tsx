import { redirect } from "@remix-run/node";

export let loader = async () => {
  const cognitoUrl = process.env.COGNITO_URL || "";
  const clientId = process.env.COGNITO_CLIENT_ID || "";
  const callbackUrl = process.env.COGNITO_REDIRECT_URL || "";

  const logingUrl = `${cognitoUrl}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=openid+email+profile`

  // Redirect to the application root with updated session
  return redirect(logingUrl);
};