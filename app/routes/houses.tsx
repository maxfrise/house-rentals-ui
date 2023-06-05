import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useUser } from "~/utils";
import { requireUserId } from "~/session.server";

import type { UiSpacingProps } from "@uireact/foundation";
import { Sizing, UiSpacing } from "@uireact/foundation";
import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";

type House = {
  landlord: string;
  houseId: string;
  houseFriendlyName: string;
  leaseStatus: string;
};

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

export default function HousesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Nueva Casa
          </Link>

          <hr />

          {data.length === 0 ? (
            <p className="p-4">todavia no hay casas</p>
          ) : (
            <ol>
              {data.map((house: House) => (
                <li key={house.houseId}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={house.houseId}
                  >
                    🏡 {house.houseFriendlyName}
                    <div className="float-right">
                      {house.leaseStatus === "AVAILABLE" ? (
                        <span className="mr-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
                          Disponible
                        </span>
                      ) : (
                        <span className="mr-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300">
                          Rentada
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
