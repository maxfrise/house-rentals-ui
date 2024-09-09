import { Form } from "@remix-run/react";

import { UiPrimaryButton } from "@uireact/button";
import { UiInput } from "@uireact/form";

import { useMatchesData } from "../../../utils";
import type { HouseOverview } from "../../../api/types/MaxfriseApiTypes";
import { UiInputDatepicker } from "@uireact/datepicker";
import { useState } from "react";

export default function LeaseHouseForm() {
  const data = useMatchesData(
    "routes/houses.$houseId"
  ) as unknown as HouseOverview;
  const house = data.house;
  const [, setDate] = useState("");

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
      <UiInputDatepicker 
        label="Dia de inicio del arendamiento"
        labelOnTop
        name="startDate"
        onChange={(date) => {setDate(date)}}
        required
        dateFormat="mm/dd/yyyy"
        disablePastDates
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
      <UiPrimaryButton type="submit">
        Guardar
      </UiPrimaryButton>
    </Form>
  );
}
