import { json, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { UiHeading, UiText } from "@uireact/text";

import { requireUserId } from "~/session.server";
import { MaxfriseApi } from "~/api/MaxfriseApi";
import type { House } from "~/types";
import { HousesList } from "~/components/dashboard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const url = process.env.MAXFRISE_API;

  const api = new MaxfriseApi(url);

  const result = (await api.getHouses(userId)).map((house: House) => ({
    landlord: house.landlord,
    houseId: house.houseId.replace(/^house#/, ""),
    houseFriendlyName: house.houseFriendlyName || "friendly name not defined",
    leaseStatus: house.leaseStatus,
  }));

  return json(result);
};

export default function HouseIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <UiHeading>Bienvenido</UiHeading>
      <UiText>Estas son tus casas:</UiText>
      <HousesList houses={data} />
    </>
  );
}
