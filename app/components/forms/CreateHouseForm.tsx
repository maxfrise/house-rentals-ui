import { Form } from "@remix-run/react";
import { SerializeFrom } from "@remix-run/server-runtime";

import { action } from "../../routes/houses.new";

import { GenericInputField } from "./fields/GenericInputFiled";
import { GenericTextArea } from "./fields/GenericTextArea";
import { SubmitButton } from "./fields/SubmitButton";

interface CreateHouseFormProps {
  actionData: SerializeFrom<typeof action> | undefined;
}

export const CreateHouseForm = (props: CreateHouseFormProps) => {
  const { actionData } = props;

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
        error={actionData?.errors.houseFriendlyName}
        name="houseFriendlyName"
      />
      <GenericTextArea
        label="Descripción  de la propiedad"
        error={actionData?.errors.description}
        name="details"
      />
      <GenericInputField
        label="Nombre del arrendador"
        error={actionData?.errors.landlordName}
        name="landlordName"
      />
      <GenericInputField
        label="Telefono del arrendador"
        error={actionData?.errors.landlordPhone}
        name="landlordPhone"
      />
      <GenericInputField
        label="Direccion de la casa"
        error={actionData?.errors.address}
        name="address"
      />
      <GenericInputField
        label="Nombre del arrendatario"
        error={actionData?.errors.tenantName}
        name="tenantName"
      />
      <GenericInputField
        label="Telefono del arrendatario"
        error={actionData?.errors.tenantPhone}
        name="tenantPhone"
      />
      <SubmitButton />
    </Form>
  );
};
