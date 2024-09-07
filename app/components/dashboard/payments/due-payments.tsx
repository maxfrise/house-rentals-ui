import React from 'react';

import { UiPrimaryButton } from "@uireact/button";
import { UiCard } from "@uireact/card";
import { UiFlexGrid } from "@uireact/flex";
import type { UiSpacingProps} from "@uireact/foundation";
import { UiSpacing, UiViewport, useViewport } from "@uireact/foundation";
import { UiHeading, UiText } from "@uireact/text";

import type { Payment } from "~/api/types";
import { formatDate } from "../../../utils/format-date";
import { formatMoney } from "../../../utils/format-money";

type DuePaymentsProps = {
  payments: Payment[];
  onPayClick: (payment: Payment) => void;
}

const payButtonSpacing: UiSpacingProps['padding'] = {block: 'two', inline: 'four'};

export const DuePayments = ({ payments, onPayClick }: DuePaymentsProps) => {
  const { isSmall } = useViewport();
  
  return (
    <>
        <UiHeading level={4} margin={{top: 'four'}}>Pagos activos</UiHeading>
        <UiSpacing padding={{ block: 'four' }}>
          {!payments || payments.length === 0 && (
            <UiText fontStyle="bold">No hay pagos activos</UiText>
          )}
          <UiFlexGrid direction="column" gap="four">
            {payments?.map((payment, index) => {
              const dateString = payment.pk.replace(/^p#/, "");
              const stringifiedDate = dateString.replace(/T.*$/, "");
              const date = new Date(`${stringifiedDate} 00:00`);

              return (
                <UiCard key={`due-payment-card-${index}`} category="primary" weight="10">
                  <UiFlexGrid alignItems="center" justifyContent="space-between">
                    <UiFlexGrid direction={isSmall ? 'row' : 'column'} justifyContent="space-between" className={"full-width"} gap="three">
                      <UiText fontStyle="bold">{formatDate(date)}</UiText>
                      <UiText>{formatMoney(parseInt(payment.details?.[0]?.amount))}</UiText>
                    </UiFlexGrid>
                    <UiViewport criteria={"m|l|xl"}>
                      <UiPrimaryButton onClick={() => onPayClick(payment)} padding={payButtonSpacing} size="large">
                        <p>Pagar</p>
                      </UiPrimaryButton>
                    </UiViewport>
                  </UiFlexGrid>
                  {isSmall && (
                    <UiSpacing padding={{ top: 'four' }}>
                      <UiPrimaryButton onClick={() => onPayClick(payment)} padding={payButtonSpacing} fullWidth>
                        Pagar
                      </UiPrimaryButton>
                    </UiSpacing>
                  )}
                </UiCard>
              );
            })}
          </UiFlexGrid>
        </UiSpacing>
      </>
  )
};