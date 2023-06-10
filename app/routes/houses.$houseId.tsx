import { useState } from "react"
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  Outlet,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { useDialog } from '@uireact/dialog';
import { UiBadge } from '@uireact/badge';

import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";
import type { Payment } from "../datasource/MaxfriseApi/MaxfriseApiTypes"
import { requireUserId } from "~/session.server";
import { PayHouseDialog } from "../components/payHouseDialog"
import { UiHeading, UiLink, UiText } from "@uireact/text";
import { UiButton } from "@uireact/button";

export const loader = async ({ params, request }: LoaderArgs) => {
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

export default function HouseDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const payHouseDialog = useDialog('pay-house-dialog'); // TODO: this should be a constant that can be exported
  const [activePayment, setActivePayment] = useState<Payment>()
  const house = data.house;


  const onPayButtonClick = (paymentJob: Payment) => {
    setActivePayment(paymentJob)
    payHouseDialog.actions.openDialog();
  }

  return (
    <div>
      <UiHeading>{house.houseFriendlyName}</UiHeading>
      <UiText>{house.details}</UiText>
      <UiHeading>Propietario</UiHeading>
      <UiText>{house.landlords[0].name}</UiText>
      <UiText>{house.landlords[0].phone}</UiText>
      <UiHeading>Arrendatario</UiHeading>
      <UiText>{house.tenants[0].name}</UiText>
      <UiText>{house.tenants[0].phone}</UiText>

      <hr className="my-4" />
      {house.leaseStatus === "AVAILABLE" && (
        <UiLink href="./startLease" useReactLink>
          Arrendar la casa
        </UiLink>
      )}
      {house.leaseStatus === "LEASED" && (
        <>
          <UiHeading>Pagos</UiHeading>
          <div className="payments">
            {data.payments?.map((payment, idx) => {
              const dateString = payment.pk.replace(/^p#/, "");
              const date = dateString.replace(/T.*$/, "");

              return (
                <div key={`payment-${idx}`} className="flex p-2">
                  <div className="flex-auto">
                    <UiText>{payment.details[0].amount}</UiText>
                  </div>
                  <div className="flex-auto">
                    <UiText>{date}</UiText>
                  </div>
                  <div className="w-64">
                    <Badge status={payment.status} />
                  </div>
                  <div className="">
                    {payment.status === "DUE" ? (
                      <UiButton onClick={() => onPayButtonClick(payment)}>
                        Pagar
                      </UiButton>
                    ) : (
                      <UiButton disabled>
                        Pagar
                      </UiButton>
                    )}
                  </div>
                </div>
              );
            })}
            <PayHouseDialog payment={activePayment} />
          </div>
        </>
      )}
      <div className="my-4">
        <Outlet />
      </div>
    </div>
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
