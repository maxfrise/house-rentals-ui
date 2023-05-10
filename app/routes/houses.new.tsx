import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import cuid from "cuid";

import { requireUserId } from "~/session.server";

import { CreateHouseForm } from "../components/forms/CreateHouseForm";

import FormValidator from "../components/forms/validator/form-validator";
import { useState } from "react";

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

type FormField = {
  value: string;
  error?: string
}

export type FormState = {
  houseFriendlyName: FormField;
  details: FormField;
  landlordName: FormField;
  landlordPhone: FormField;
  address: FormField;
  tenantName: FormField;
  tenantPhone: FormField;
}

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const [formState, setFormState] = useState<FormState>({
    houseFriendlyName: {
      value: ''
    },
    details: {
      value: ''
    },
    landlordName: {
      value: ''
    },
    landlordPhone: {
      value: ''
    },
    address: {
      value: ''
    },
    tenantName: {
      value: ''
    },
    tenantPhone: {
      value: ''
    }
  })

  const onInputChange = (value: Partial<FormState>) => {
    /**
     * Global form state is being through thougth this callback
     */
    setFormState({
      ...formState,  
      ...value    
    })    
    // Do update the state here!
  }

  const onFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // validate, if valid let the form go
    // otherwise prevent the default
    console.log("VALIDATE_FORM", formState)
    // const validate = () => true
    // if (validate()) {
    //   // Do nothing here, let the form submit
    // } else {
    //   event.preventDefault()
    // }
    event.preventDefault()
  }

  return <CreateHouseForm
    formChangeCB={onInputChange}
    onFormSubmit={onFormSubmit}
    actionData={actionData}
    formState={formState}
  />;
}
