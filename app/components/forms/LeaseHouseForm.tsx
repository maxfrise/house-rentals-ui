import { Form } from "@remix-run/react";
import {
  GenericInputField,
  InputType,
} from "../forms/fields/GenericInputField";
import { SubmitButton } from "./fields/SubmitButton";
import { useMatchesData } from "../../utils";
import type { House } from "../../datasource/MaxfriseApi/MaxfriseApiTypes";

export default function LeaseHouseForm() {
  const houses = useMatchesData("routes/houses.$houseId") as unknown as House[];
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
      <input
        type="hidden"
        name="tenants"
        value={JSON.stringify(houses?.[0]?.tenants)}
      />
      <input
        type="hidden"
        name="landlords"
        value={JSON.stringify(houses?.[0]?.landlords)}
      />
    </Form>
  );
}
