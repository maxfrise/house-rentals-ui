import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import cuid from "cuid";

import { requireUserId } from "~/session.server";

import { CreateHouseForm } from "../components/forms/CreateHouseForm";

import FormValidator from "../components/forms/validator/form-validator";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const landlordName = formData.get("landlordName");
  const landlordPhone = formData.get("landlordPhone");
  const address = formData.get("address");
  const details = formData.get("details");
  const houseFriendlyName = formData.get("houseFriendlyName");
  const tenantName = formData.get("tenantName");
  const tenantPhone = formData.get("tenantPhone");

  const errors = FormValidator(formData);

  if (errors.hasErrors) {
    return json({ errors }, { status: 400 });
  }

  const url = "https://api.maxfrise.com/createhouse";

  const houseId = `house#${cuid()}`;

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      landlord: userId,
      houseId,
      houseFriendlyName,
      address,
      details,
      landlords: [{ name: landlordName, phone: landlordPhone }],
      leaseStatus: "AVAILABLE", // Hardcoded as it is the default state
      tenants: [{ name: tenantName, phone: tenantPhone }],
    }),
  });

  return redirect(`/houses/${houseId.replace(/^house#/, "")}`);
};

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  return <CreateHouseForm actionData={actionData} />;
}
