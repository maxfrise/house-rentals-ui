import { Form } from "@remix-run/react";
import {
  GenericInputField,
  InputType,
} from "../forms/fields/GenericInputField";
import { SubmitButton } from "./fields/SubmitButton";
import { useMatchesData } from "../../utils";
import type { HouseOverview } from "../../datasource/MaxfriseApi/MaxfriseApiTypes";

export default function LeaseHouseForm() {
  const data = useMatchesData(
    "routes/houses.$houseId"
  ) as unknown as HouseOverview;
  const house = data.house;

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
        value={JSON.stringify(house.tenants)}
      />
      <input
        type="hidden"
        name="landlords"
        value={JSON.stringify(house.landlords)}
      />
    </Form>
  );
}
