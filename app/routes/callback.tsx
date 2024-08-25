import type { LoaderArgs } from "@remix-run/node";
import { doAuth } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  // Should authenticate???
  doAuth(request)

  return {}
};
export default function Callback() {
  return <div> THIS IS A CALLBACK</div>
}