import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.houseId, "house not found");
  const userId = await requireUserId(request);  
  const url = `https://api.maxfrise.com/gethouses?landlord=${encodeURIComponent(userId)}`;  
  const res = await fetch(url, {
    method: "GET",
  });

  const houses = await res.json()

  const house = houses.filter((house: any) => {    
    return house.houseId === params.houseId
  })
  
  if (!house) {
    throw new Response("Not Found", { status: 404 });
  }  

  return json(house);
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "houseId not found");

  // await deleteNote({ id: params.noteId, userId });

  return redirect("/houses");
};

export default function HouseDetailsPage() {
  const data = useLoaderData<typeof loader>()[0];
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.houseId}</h3>
      <p className="py-6">{data.details}</p>
      <hr className="my-4" />
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
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
