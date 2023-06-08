import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { UiViewRow } from "@uireact/view";
import { UiFlexGrid, UiFlexGridItem } from "@uireact/flex-grid";
import type { UiSpacingProps} from "@uireact/foundation";
import { UiSpacing, UiViewport } from "@uireact/foundation";

import { requireUserId } from "~/session.server";

import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";
import { Navbar, Graphics } from '../components/dashboard';
import type { House } from '../types';

export const loader = async ({ request }: LoaderArgs) => {
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

const MainContentSpacing: UiSpacingProps['margin'] = { block: 'four' };

export default function HousesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <UiViewRow centeredContent weight="50">
      <UiViewport criteria={'l|xl'}>
        <UiFlexGrid columnGap="five">
          <UiFlexGridItem>
            <UiSpacing margin={MainContentSpacing}>
              <Navbar houses={data} />
            </UiSpacing>
          </UiFlexGridItem>
          <UiFlexGridItem grow={1}>
            <UiSpacing margin={MainContentSpacing}>
              <Graphics />
            </UiSpacing>
          </UiFlexGridItem>
        </UiFlexGrid>
      </UiViewport>
      <UiViewport criteria={'s|m'}>
        <UiSpacing margin={MainContentSpacing}>
          <Graphics />
        </UiSpacing>
      </UiViewport>
    </UiViewRow>
  );
}
