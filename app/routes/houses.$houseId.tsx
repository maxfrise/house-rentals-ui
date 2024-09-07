import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  Outlet,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { UiBadge } from '@uireact/badge';
import { UiPrimaryButton } from "@uireact/button";
import { useDialog } from '@uireact/dialog';
import { UiHeading, UiText } from "@uireact/text";
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing } from "@uireact/foundation";
import { UiCard } from "@uireact/card";
import type { UiTableData, UiTableItem } from "@uireact/table";
import { UiTable } from "@uireact/table";

import { MaxfriseApi } from "../api/MaxfriseApi";
import type { Payment } from "../api/types/MaxfriseApiTypes"
import { requireUserId } from "~/session.server";
import { PayHouseDialog } from "../components/payHouseDialog"
import { formatDate } from "~/utils/format-date";
import { formatMoney } from "~/utils/format-money";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = process.env.MAXFRISE_API;
  const api = new MaxfriseApi(url);
  invariant(params.houseId, "house not found");
  const userId = await requireUserId(request);

  const houseOverview = await api.getHouseOverView(params.houseId, userId);

  const house = houseOverview?.house;
  const payments = houseOverview?.payments;

  if (!house) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    house: house,
    payments,
  });
};

const Badge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "DUE":
      return (
        <UiBadge category="warning">Pendiente</UiBadge>
      );
    case "NOT_DUE":
      return (
        <UiBadge>No Pendiente</UiBadge>
      );
    case "PAID":
      return (
        <UiBadge category="positive">Pagado</UiBadge>
      );
    default:
      return null;
  }
};

const textSpacing: UiSpacingProps['margin'] = { block: 'three' };
const headingSpacing: UiSpacingProps['margin'] = { block: 'four' };
const payButtonSpacing: UiSpacingProps['padding'] = {block: 'two', inline: 'four'};

export default function HouseDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const payHouseDialog = useDialog('pay-house-dialog'); // TODO: this should be a constant that can be exported
  const [activePayment, setActivePayment] = useState<Payment>()
  const house = data.house;
  const navigate = useNavigate();

  const onPayButtonClick = useCallback((paymentJob: Payment) => {
    setActivePayment(paymentJob)
    payHouseDialog.actions.openDialog();
  }, [payHouseDialog.actions]);

  const onLeaseClick = () => { 
    navigate('./startLease');
  }

  const tableData = useMemo((): UiTableData => {
    const items: UiTableItem[] = data.payments?.map((payment, id) => {
      const dateString = payment.pk.replace(/^p#/, "");
      const stringifiedDate = dateString.replace(/T.*$/, "");
      const date = new Date(`${stringifiedDate} 00:00`);

      return {
        id,
        cols: [
          `${formatMoney(parseInt(payment.details?.[0]?.amount))}`,
          `${formatDate(date)}`,
          <Badge status={payment.status} key={`payment-badge-status-${id}`} />,
          <div key={`payment-action-${id}`}>
            {payment.status === "DUE" ? (
              <UiPrimaryButton onClick={() => onPayButtonClick(payment)} padding={payButtonSpacing}>
                Pagar
              </UiPrimaryButton>
            ) : (
              <UiPrimaryButton disabled padding={payButtonSpacing}>
                Pagar
              </UiPrimaryButton>
            )}
          </div>
        ]
      }
    }) || [];

    return {
      headings: [
        {
          label: "Cantidad",
        }, {
          label: "Fecha"
        },
        { 
          label: "Estado"
        }, {
          label: ""
        }
      ],
      items
    }
  }, [data.payments, onPayButtonClick]);

  return (
    <UiCard category="primary">
      <UiSpacing margin={headingSpacing}>
        <UiHeading>{house.houseFriendlyName}</UiHeading>
      </UiSpacing>
      <UiSpacing margin={textSpacing}>
        <UiText>{house.details}</UiText>
      </UiSpacing>
      <UiSpacing margin={headingSpacing}>
        <UiHeading>Propietario</UiHeading>
      </UiSpacing>
      <UiSpacing margin={textSpacing}>
        <UiText>{house.landlords[0].name}</UiText>
        <UiText>{house.landlords[0].phone}</UiText>
      </UiSpacing>
      <UiSpacing margin={headingSpacing}>
        <UiHeading>Arrendatario</UiHeading>
      </UiSpacing>
      <UiSpacing margin={textSpacing}>
        <UiText>{house.tenants[0].name}</UiText>
        <UiText>{house.tenants[0].phone}</UiText>
      </UiSpacing>

      <hr className="my-4" />
      {house.leaseStatus === "AVAILABLE" && (
        <UiPrimaryButton onClick={onLeaseClick} margin={{ top: 'four' }}>
          Arrendar la casa
        </UiPrimaryButton>
      )}
      {house.leaseStatus === "LEASED" && (
        <>
          <UiHeading>Pagos</UiHeading>
          <UiTable data={tableData} bordered />
          <PayHouseDialog payment={activePayment} />
        </>
      )}
      <div className="my-4">
        <Outlet />
      </div>
    </UiCard>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>House not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
