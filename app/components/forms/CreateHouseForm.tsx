import { Form } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import type { action } from "../../routes/houses.new";
import { GenericInputField } from "./fields/GenericInputField";
import { GenericTextArea } from "./fields/GenericTextArea";
import { SubmitButton } from "./fields/SubmitButton";
import type { FormState } from "../../routes/houses.new";
import { MaxfriseErrors } from "./validator/form-validator-yup";

interface CreateHouseFormProps {  
  formState?: FormState;
  errors: MaxfriseErrors<FormState>;
  onFormFieldChange?: (value: Partial<FormState>) => void;
  onFormSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CreateHouseForm = (props: CreateHouseFormProps) => {
  const { formState, errors, onFormFieldChange, onFormSubmit } =
    props;

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
        label="Nombre de la propiedad"
        name="houseFriendlyName"
        initialValue={formState?.houseFriendlyName}
        cb={onFormFieldChange}
        error={errors?.houseFriendlyName}
      />
      <GenericTextArea
        label="Descripción de la propiedad"
        name="details"
        initialValue={formState?.details}
        cb={onFormFieldChange}
        error={errors?.details}
      />
      <GenericInputField
        label="Nombre del arrendador"
        name="landlordName"
        initialValue={formState?.landlordName}
        cb={onFormFieldChange}
        error={errors?.landlordName}
      />
      <GenericInputField
        label="Telefono del arrendador"
        name="landlordPhone"
        initialValue={formState?.landlordPhone}
        cb={onFormFieldChange}
        error={errors?.landlordPhone}
      />
      <GenericInputField
        label="Direccion de la casa"
        name="address"
        initialValue={formState?.address}
        cb={onFormFieldChange}
        error={errors?.address}
      />
      <GenericInputField
        label="Nombre del arrendatario"
        name="tenantName"
        initialValue={formState?.tenantName}
        cb={onFormFieldChange}
        error={errors?.tenantName}
      />
      <GenericInputField
        label="Telefono del arrendatario"
        name="tenantPhone"
        initialValue={formState?.tenantPhone}
        cb={onFormFieldChange}
        error={errors?.tenantPhone}
      />
      <SubmitButton onFormSubmit={onFormSubmit} />
    </Form>
  );
};
