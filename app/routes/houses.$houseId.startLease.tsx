import LeaseHouseForm from "../components/forms/LeaseHouseForm";
import { requireUserId } from "~/session.server";

import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const startDate = formData.get("startDate");
  const term = formData.get("term");
  const rentAmount = formData.get("rentAmount");
  const tenants = formData.get("tenants");
  const landlords = formData.get("landlords");

  invariant(params.houseId, "house not found");
  invariant(startDate, "start date is required");

  // TODO: populate tenants and landlord from the DB
  // Send a request to get the house first
  const body = {
    user: userId.replace(/^email#/, ""),
    houseid: params.houseId,
    startDate,
    term,
    rentAmount,
    landlords: JSON.parse(landlords?.toString() || "[]"),
    tenants: JSON.parse(tenants?.toString() || "[]"),
  };

  const apiUrl = "https://api.maxfrise.com/initlease";

  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (res.status === 200) {
    return redirect(`/houses/${params.houseId}`);
  }
};

export default function StartLeaseView() {
  return <LeaseHouseForm />;
}
