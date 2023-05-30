import React from "react";
import { Form } from "@remix-run/react";
import { GenericInputField } from "./fields/GenericInputField";
import { SubmitButton } from "./fields/SubmitButton";
import type { MaxfriseErrors } from "./validator/form-validator-yup";
import type { FormState } from "../../routes/houses.$houseId.pay.$jobid";
import { GenericTextArea } from "./fields/GenericTextArea";

interface CreateHouseFormProps {
  formState?: FormState;
  errors: MaxfriseErrors<FormState>;
  onFormFieldChange?: (value: Partial<FormState>) => void;
  onFormSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PayHouseform(props: CreateHouseFormProps) {
  const { formState, errors, onFormFieldChange, onFormSubmit } = props;
  return (
    <Form method="post">
      <GenericInputField
        label="Metodo"
        name="method"
        initialValue={formState?.method}
        cb={onFormFieldChange}
        error={errors?.method}
      />
      <GenericTextArea
        label="Detalles"
        name="details"
        initialValue={formState?.details}
        cb={onFormFieldChange}
        error={errors?.details}
      />
      <input type="hidden" name="amount" value={formState?.amount} />
      <input type="hidden" name="pk" value={formState?.pk} />
      <input type="hidden" name="st" value={formState?.st} />
      <SubmitButton
        onFormSubmit={onFormSubmit}
        className="pt-5"
        label="Pagar"
      />
    </Form>
  );
}
