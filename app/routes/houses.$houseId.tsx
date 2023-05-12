import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  Outlet,
  Link,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { MaxfriseApi } from "../datasource/MaxfriseApi/MaxfriseApi";

import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const api = new MaxfriseApi("https://api.maxfrise.com");
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
        <span className="mr-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Pendiente
        </span>
      );
    case "NOT_DUE":
      return (
        <span className="mr-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          No pendiente
        </span>
      );
    case "PAID":
      return (
        <span className="mr-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Pagado
        </span>
      );
    default:
      return null;
  }
};

export default function HouseDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const house = data.house;

  return (
    <div>
      <h3 className="text-2xl font-bold">{house.houseFriendlyName}</h3>
      <p className="py-6">{house.details}</p>
      <h3 className="text-1xl font-bold">Propietario</h3>
      <p>{house.landlords[0].name}</p>
      <p>{house.landlords[0].phone}</p>
      <h3 className="text-1xl pt-6 font-bold">Arrendatario</h3>
      <p>{house.tenants[0].name}</p>
      <p>{house.tenants[0].phone}</p>

      <hr className="my-4" />
      {house.leaseStatus === "AVAILABLE" && (
        <Link
          to="startLease"
          className="rounded-none bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Arrendar la casa
        </Link>
      )}
      {house.leaseStatus === "LEASED" && (
        <>
          <h3 className="pt-4 text-2xl font-bold">Pagos</h3>
          <div className="payments">
            {data.payments?.map((payment) => {
              const dateString = payment.pk.replace(/^p#/, "");
              const date = dateString.replace(/T.*$/, "");
              return (
                <div className="flex p-2">
                  <div className="flex-auto">
                    <p>{payment.details[0].amount}</p>
                  </div>
                  <div className="flex-auto">
                    <p>{date}</p>
                  </div>
                  <div className="w-64">
                    <Badge status={payment.status} />
                  </div>
                  <div className="">
                    {payment.status === "DUE" ? (
                      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Pagar
                      </button>
                    ) : (
                      <button className="cursor-not-allowed rounded bg-blue-500 px-4 py-2 font-bold text-white opacity-50">
                        Pagar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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
