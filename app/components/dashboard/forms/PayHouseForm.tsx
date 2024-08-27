import React, { useEffect, useState } from "react";

import { UiInput, UiTextArea, } from "@uireact/form";
import { UiPrimaryButton } from "@uireact/button";
import type { Payment } from "~/api/types/MaxfriseApiTypes";
import { useFetcher } from "@remix-run/react";
import type { action } from "../../../routes/payjob";

interface CreateHouseFormProps {
  payment?: Payment;
  onPaymentSubmitted?: () => void;
}

export default function PayHouseform(props: CreateHouseFormProps) {
  const { payment, onPaymentSubmitted } = props;
  const fetcher = useFetcher<typeof action>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    /**
     * The form was submitted
     * It is idle
     * No errores came back
     */

    if (
      formSubmitted &&
      fetcher.state === "idle" &&
      fetcher.data?.errors === undefined
    ) {
      onPaymentSubmitted?.();
    }
  }, [formSubmitted, fetcher.state, fetcher.data?.errors, onPaymentSubmitted]);

  return (
    <div>
      <fetcher.Form
        method="POST"
        action="/payjob"
        onSubmit={() => setFormSubmitted(true)}
        role="form"
      >
        <UiInput
          label="Metodo"
          labelOnTop
          type="text"
          name="method"
          error={fetcher.data?.errors?.method || undefined}
          category={fetcher.data?.errors?.method ? "error" : undefined}
        />
        <UiTextArea
          label="Detalles"
          labelOnTop
          name="details"
          error={fetcher.data?.errors?.details || undefined}
          category={fetcher.data?.errors?.details ? "error" : undefined}
        />
        <input
          type="hidden"
          name="amount"
          value={payment?.details[0]?.amount}
        />
        <input type="hidden" name="pk" value={payment?.pk} />
        <input type="hidden" name="st" value={payment?.st} />
        <UiPrimaryButton fullWidth type="submit" disabled={fetcher.state !== "idle"}>
          {fetcher.state === "idle" ? "Pagar" : "Guardando"}
        </UiPrimaryButton>
      </fetcher.Form>
    </div>
  );
}
