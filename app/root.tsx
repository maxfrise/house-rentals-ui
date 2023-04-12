import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeContext, Themes } from "@uireact/foundation";

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  // NOTE: Architect deploys the public directory to /_static/
  { rel: "icon", href: "/_static/favicon.ico" },
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

const noOpFn = () => {};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ThemeContext.Provider
          value={{ theme: Themes.dark, toogleTheme: noOpFn }}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
