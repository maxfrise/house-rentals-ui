import type { FormEvent } from "react";
import { useEffect, useState, useMemo } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import cuid from "cuid";

import { requireUserId } from "~/session.server";

import { CreateHouseForm } from "../components/dashboard/forms/CreateHouseForm";

import { object, string, number } from "yup";
import { validate } from "../components/dashboard/forms/validator/form-validator-yup";
import type { MaxfriseErrors } from "../components/dashboard/forms/validator/form-validator-yup";
import { MaxfriseApi } from "../api/MaxfriseApi";
import { UiCard } from "@uireact/card";

const newHouseSchema = object({
  houseFriendlyName: string().required().max(40),
  details: string().required().max(500),
  landlordName: string().required().max(40),
  landlordPhone: number()
    .typeError("El campo tiene que ser número")
    .positive()
    .integer()
    .test(
      "len",
      "El telefono tiene que ser de 10 digitos",
      (val) => val?.toString().length === 10
    )
    .required(),
  address: string().required().max(40),
  tenantName: string().required().max(40),
  tenantPhone: number()
    .typeError("El campo tiene que ser número")
    .positive()
    .integer()
    .test(
      "len",
      "El telefono tiene que ser de 10 digitos",
      (val) => val?.toString().length === 10
    )
    .required(),
});

export type FormState = {
  houseFriendlyName: string;
  details: string;
  landlordName: string;
  landlordPhone: string;
  address: string;
  tenantName: string;
  tenantPhone: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = Object.fromEntries(await request.formData());
  const errors: MaxfriseErrors<FormState> = await validate(
    formData,
    newHouseSchema
  );

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const {
    houseFriendlyName,
    address,
    details,
    landlordName,
    landlordPhone,
    tenantName,
    tenantPhone,
  } = formData;

  const houseId = `house#${cuid()}`;

  const url = process.env.MAXFRISE_API;

  const api = new MaxfriseApi(url);

  await api.createHouse({
    landlord: userId,
    houseId,
    houseFriendlyName: `${houseFriendlyName}`,
    address: `${address}`,
    details: `${details}`,
    landlords: [{ name: `${landlordName}`, phone: `+52${landlordPhone}` }],
    leaseStatus: "AVAILABLE", // Hardcoded as it is the default state
    tenants: [{ name: `${tenantName}`, phone: `+52${tenantPhone}` }],
  });

  return redirect(`/houses/${houseId.replace(/^house#/, "")}`);
};

export default function NewHousePage() {
  const newHouseModel: FormState = useMemo(
    () => ({
      houseFriendlyName: "",
      details: "",
      landlordName: "",
      landlordPhone: "",
      address: "",
      tenantName: "",
      tenantPhone: "",
    }),
    []
  );

  const actionData = useActionData<typeof action>();

  const [formState, setFormState] = useState<FormState>(newHouseModel);
  const [errors, setErrors] = useState<MaxfriseErrors<FormState>>(
    actionData?.errors || newHouseModel
  );

  useEffect(() => {
    // Set the errors that comes from the server
    setErrors(actionData?.errors || newHouseModel);
  }, [actionData?.errors, newHouseModel]);

  const onFormFieldChange = (value: Partial<FormState>) => {
    /**
     * Global form state is being tracked through this handler
     */
    setFormState({
      ...formState,
      ...value,
    });
  };

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const errors = await validate(formState, newHouseSchema);

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setErrors(errors);
    }
    // If no errors, let the form be submitted
  };

  return (
    <UiCard category="primary">
      <CreateHouseForm
        onFormFieldChange={onFormFieldChange}
        onFormSubmit={onFormSubmit}
        formState={formState}
        errors={errors}
      />
    </UiCard>
  );
}
