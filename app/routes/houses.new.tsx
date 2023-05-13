import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import cuid from "cuid";

import { requireUserId } from "~/session.server";

import { CreateHouseForm } from "../components/forms/CreateHouseForm";

import FormValidator from "../components/forms/validator/form-validator";
import { useState } from "react";

import { object, string, setLocale } from "yup";
import { validate, MaxfriseErrors } from "../components/forms/validator/form-validator-yup";

setLocale({
  mixed: {
    required: "el campo es requerido",
  },
});

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

export type FormState = {
  houseFriendlyName: string;
  details: string;
  landlordName: string;
  landlordPhone: string;
  address: string;
  tenantName: string;
  tenantPhone: string;
};

export default function NewNotePage() {
  const newHouseModel: FormState = {
    houseFriendlyName: "",
    details: "",
    landlordName: "",
    landlordPhone: "",
    address: "",
    tenantName: "",
    tenantPhone: ""
  }
  const actionData = useActionData<typeof action>();
  const [formState, setFormState] = useState<FormState>(newHouseModel);
  const [errors, setErrors] = useState<MaxfriseErrors<FormState>>(newHouseModel)

  const onFormFieldChange = (value: Partial<FormState>) => {
    /**
     * Global form state is being tracked through this handler
     */
    setFormState({
      ...formState,
      ...value,
    });
  };

  const onFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: move this where it can be used by the server, and add full validations
    // let newHouseSchema = object({
    //   houseFriendlyName: string().required(),
    // });
    
    // const errors = await validate(formState, newHouseSchema)
    
    // if (Object.keys({errors}).length > 0) {
    //   event.preventDefault();
    //   setErrors(errors)
    // }
    
    // When no error let the form submit
  };

  return (
    <CreateHouseForm
      onFormFieldChange={onFormFieldChange}
      onFormSubmit={onFormSubmit}
      actionData={actionData}
      formState={formState}
      errors={errors}
    />
  );
}
