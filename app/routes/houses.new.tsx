import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import cuid from "cuid";

import { requireUserId } from "~/session.server";

import { CreateHouseForm } from "../components/forms/CreateHouseForm";

import FormValidator from "../components/forms/validator/form-validator";
import { useState } from "react";

import { object, string, number, date, InferType, setLocale } from 'yup';
import { validate } from "../components/forms/validator/form-validator-yulp"

setLocale({
  mixed: {
    required: "el campo es requerido"
  }
})

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

  const onFormFieldChange = (value: Partial<FormState>) => {
    /**
     * Global form state is being tracked through this handler
     */
    setFormState({
      ...formState,
      ...value
    })
  }

  const onFormSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // validate, if valid let the form go
    // otherwise prevent the default
    console.log("VALIDATE_FORM", formState)
    // const validate = () => true
    // if (validate()) {
    //   // Do nothing here, let the form submit
    // } else {
    //   event.preventDefault()
    // }
    let userSchema = object({
      name: string().required(),
      age: number().required().positive().integer(),
      email: string().email(),
      website: string().url().nullable(),
      createdOn: date().default(() => new Date()),
    });

    // try {
    //   const result = await userSchema.validate({ name: 1 })
    //   console.log("validation", result)
    // } catch (err) {
    //   console.log("There was an error validatiing the form")
    //   console.log(err)
    // }

    // const result = userSchema.validate({ name: 1 })
    //   .then(() => {
    //     // Here seems like all good?
    //   }, (err) => {
    //     console.log("THERE WAS A YULP ERROR!")
    //     console.log(err.name)
    //   })
    validate({ name: 1 }, userSchema).then(() => {
      // Here seems like all good?
    }, (err) => {
      console.log("THERE WAS A YULP ERROR!")
      console.log(err)
    })          
    // The state should be validated, the result of that should be reset

    event.preventDefault()
  }

  return <CreateHouseForm
    onFormFieldChange={onFormFieldChange}
    onFormSubmit={onFormSubmit}
    actionData={actionData}
    formState={formState}
  />;
}
