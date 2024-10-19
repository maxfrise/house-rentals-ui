import { redirect } from "@remix-run/node";
import { cognitoUrl, clientId, callbackUrl } from "../session/cognito.constants"

export let loader = async () => {
  const signupUrl = `${cognitoUrl}/signup?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=openid+email+profile`

  return redirect(signupUrl);
};