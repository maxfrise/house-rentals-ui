import { Form } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import type { action } from "../../routes/houses.new";
import { GenericInputField } from "./fields/GenericInputField";
import { GenericTextArea } from "./fields/GenericTextArea";
import { SubmitButton } from "./fields/SubmitButton";
import type { FormState } from "../../routes/houses.new";
import { MaxfriseErrors } from "./validator/form-validator-yup";

interface CreateHouseFormProps {
  actionData: SerializeFrom<typeof action> | undefined;
  formState?: FormState;
  onFormFieldChange?: (value: Partial<FormState>) => void;
  onFormSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errors: MaxfriseErrors<FormState>
}

export const CreateHouseForm = (props: CreateHouseFormProps) => {
  const { actionData, onFormFieldChange, onFormSubmit, formState, errors } = props;

  console.log("ERROR")
  console.log(errors)

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <GenericInputField
        initialValue={formState?.houseFriendlyName}
        cb={onFormFieldChange}
        label="Nombre de la propiedad"
        error={errors?.houseFriendlyName}
        name="houseFriendlyName"
      />
      <GenericTextArea
        initialValue={formState?.details}
        cb={onFormFieldChange}
        label="Descripción de la propiedad"
        error={actionData?.errors.description}
        name="details"
      />
      <GenericInputField
        initialValue={formState?.landlordName}
        cb={onFormFieldChange}
        label="Nombre del arrendador"
        error={actionData?.errors.landlordName}
        name="landlordName"
      />
      <GenericInputField
        initialValue={formState?.landlordPhone}
        cb={onFormFieldChange}
        label="Telefono del arrendador"
        error={actionData?.errors.landlordPhone}
        name="landlordPhone"
      />
      <GenericInputField
        initialValue={formState?.address}
        cb={onFormFieldChange}
        label="Direccion de la casa"
        error={actionData?.errors.address}
        name="address"
      />
      <GenericInputField
        initialValue={formState?.tenantName}
        cb={onFormFieldChange}
        label="Nombre del arrendatario"
        error={actionData?.errors.tenantName}
        name="tenantName"
      />
      <GenericInputField
        initialValue={formState?.tenantPhone}
        cb={onFormFieldChange}
        label="Telefono del arrendatario"
        error={actionData?.errors.tenantPhone}
        name="tenantPhone"
      />
      <SubmitButton onFormSubmit={onFormSubmit} />
    </Form>
  );
};
