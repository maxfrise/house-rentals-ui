import { Form } from "@remix-run/react";
import {
  GenericInputField,
  InputType,
} from "../forms/fields/GenericInputField";
import { SubmitButton } from "./fields/SubmitButton";

export default function LeaseHouseForm() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "20%",
      }}
    >
      {/* TOOD: restrict the day to be selected */}
      <GenericInputField
        label="Dia de inicio del arendamiento"
        error={null}
        name="startDate"
        type={InputType.DATE}
      />
      {/* TODO: This should probably be a fixed selection, 6 or 12 months maybe? */}
      <GenericInputField
        label="Duración del arrendamiento"
        error={null}
        name="term"
        type={InputType.NUMBER}
      />
      <GenericInputField
        label="Precio de la renta"
        error={null}
        name="rentAmount"
        type={InputType.NUMBER}
      />
      <SubmitButton />
    </Form>
  );
}
