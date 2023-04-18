import LeaseHouseForm from "../components/forms/LeaseHouseForm";

import { requireUserId } from "~/session.server";

import { ActionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

// TODO: the loader should check the house status, and if it is rented then it should redirect it back to the prev view

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const startDate = formData.get("startDate");
  const term = formData.get("term");
  const rentAmount = formData.get("rentAmount");

  invariant(params.houseId, "house not found");
  invariant(startDate, "start date is required");

  const date = new Date(startDate.toString());

  const body = {
    landlord: userId,
    houseKey: `house#${params.houseId}`,
    startDate: date.getTime() / 1000,
    term: term,
    dueDay: date.getDate(),
    rentAmount: rentAmount,
  };

  const apiUrl = "https://api.maxfrise.com/createlease";

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
