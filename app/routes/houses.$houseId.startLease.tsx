import LeaseHouseForm from "../components/forms/LeaseHouseForm";
import { requireUserId } from "~/session.server";

import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";

// TODO: the loader should check the house status, and if it is rented then it should redirect it back to the prev view

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

  const url = process.env.MAXFRISE_API;

  const api = new MaxfriseApi(url);

  const res = await api.initlease({
    user: userId.replace(/^email#/, ""),
    houseid: params.houseId,
    startDate: `${startDate}`,
    term: `${term}`,
    rentAmount: `${rentAmount}`,
    landlords: JSON.parse(landlords?.toString() || "[]"),
    tenants: JSON.parse(tenants?.toString() || "[]"),
  });

  if (res?.statusCode === 200) {
    return redirect(`/houses/${params.houseId}`);
  }
};

export default function StartLeaseView() {
  return <LeaseHouseForm />;
}
