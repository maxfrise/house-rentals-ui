import { Form, useNavigate } from "@remix-run/react";

import { UiPrimaryButton, UiTertiaryButton } from "@uireact/button";
import { UiInput } from "@uireact/form";
import { UiInputDatepicker } from "@uireact/datepicker";
import { useCallback, useState } from "react";
import { UiFlexGrid } from "@uireact/flex";
import { UiText } from "@uireact/text";
import { UiIcon } from "@uireact/icons";
import { UiSpacing } from "@uireact/foundation";
import { UiCard } from "@uireact/card";

import { useMatchesData } from "../../../utils";
import type { HouseOverview } from "../../../api/types/MaxfriseApiTypes";
import { DatepickerLabels } from "~/lib";

export default function LeaseHouseForm() {
  const navigate = useNavigate();
  const data = useMatchesData(
    "routes/houses.$houseId"
  ) as unknown as HouseOverview;
  const house = data.house;
  const [, setDate] = useState("");

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <UiSpacing padding={{ top: 'four' }}>
      <UiCard category="primary" weight="50">
        <Form method="post" style={{ maxWidth: '200px' }}>
          <UiFlexGrid direction="column" gap="three">
            <UiInputDatepicker 
              icon={<UiIcon icon="CalendarLines" />}
              label="Dia de inicio del arendamiento"
              labelOnTop
              name="startDate"
              onChange={(date) => {setDate(date)}}
              required
              dateFormat="mm/dd/yyyy"
              disablePastDates
              localizedLabels={DatepickerLabels}
            />
            {/* TODO: This should probably be a fixed selection, 6 or 12 months maybe? */}
            <UiFlexGrid alignItems="end" gap="two">
              <UiInput
                icon={<UiIcon icon="Checklist1" />}
                label="Duración del arrendamiento"
                labelOnTop
                name="term"
                type='number'
              />
              <UiText>Meses</UiText>
            </UiFlexGrid>
            <UiInput
              icon={<UiIcon icon="DollarCircle" />}
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
            <UiPrimaryButton type="submit" padding={{ block: 'two' }}>
              Iniciar arrendamiento
            </UiPrimaryButton>
            <UiTertiaryButton onClick={goBack}>
              Cancelar
            </UiTertiaryButton>
          </UiFlexGrid>
        </Form>
      </UiCard>
    </UiSpacing>
  );
}
