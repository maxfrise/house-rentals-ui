import { Form } from "@remix-run/react";

import { UiButton } from "@uireact/button";
import { UiInput } from "@uireact/form";

import { useMatchesData } from "../../../utils";
import type { HouseOverview } from "../../../api/types/MaxfriseApiTypes";

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
      <UiInput
        label="Dia de inicio del arendamiento"
        labelOnTop
        name="startDate"
        type='date'
      />
      {/* TODO: This should probably be a fixed selection, 6 or 12 months maybe? */}
      <UiInput
        label="Duración del arrendamiento"
        labelOnTop
        name="term"
        type='number'
      />
      <UiInput
        label="Precio de la renta"
        labelOnTop
        name="rentAmount"
        type='number'
      />
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
      <UiButton type="submit" category="positive">
        Guardar
      </UiButton>
    </Form>
  );
}
