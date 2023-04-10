import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useUser } from "~/utils";

import type { UiSpacingProps } from '@uireact/foundation';
import { Sizing, UiSpacing } from '@uireact/foundation';

export const loader = async ({ request }: LoaderArgs) => {
  const url = "https://api.maxfrise.com/gethouses?landlord=sergio";
  const res = await fetch(url, {
    method: "GET",
  });

  return json(await res.json());  
}

const headingMargin: UiSpacingProps['margin'] = {inline: Sizing.five};

export default function HousesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">      
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <UiSpacing margin={headingMargin}>
          <h1 className="text-3xl font-bold">
            <Link to=".">Casas</Link>
          </h1>
        </UiSpacing>
        
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

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
              {data.map((house:any) => (
                <li key={house.houseId}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={house.houseId}
                  >
                    🏡 {house.houseId}
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
