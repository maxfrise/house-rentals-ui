import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { UiInput, UiTextArea, } from "@uireact/form";
import { UiButton } from "@uireact/button";
import type { Payment } from "~/datasource/MaxfriseApi/MaxfriseApiTypes";
import { useFetcher } from "@remix-run/react";
import type { action } from "../../routes/payjob";

interface CreateHouseFormProps {
  payment?: Payment;
  onPaymentSubmitted?: () => void;
}

const Container = styled.div`
  width: 350px;
`;

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
    <Container>
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
          theme={fetcher.data?.errors?.method ? "error" : undefined}
        />
        <UiTextArea
          label="Detalles"
          labelOnTop
          name="details"
          error={fetcher.data?.errors?.details || undefined}
          theme={fetcher.data?.errors?.details ? "error" : undefined}
        />
        <input
          type="hidden"
          name="amount"
          value={payment?.details[0]?.amount}
        />
        <input type="hidden" name="pk" value={payment?.pk} />
        <input type="hidden" name="st" value={payment?.st} />
        <UiButton className="float-right mb-2" type="submit" disabled={fetcher.state !== "idle"}>
          {fetcher.state === "idle" ? "Pagar" : "Guardando"}
        </UiButton>
      </fetcher.Form>
    </Container>
  );
}
