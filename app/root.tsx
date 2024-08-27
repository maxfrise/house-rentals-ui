import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { setLocale } from "yup";

import { UiView } from '@uireact/view';

import globalStyles from "~/styles/global.css";
import maxfriseTheme from "~/styles/maxfrise-theme.css";
import { getUser } from "~/session.server";
import { Header } from './components/header';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: maxfriseTheme },
  { rel: "stylesheet", href: globalStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  // NOTE: Architect deploys the public directory to /_static/
  { rel: "icon", href: "/_static/favicon.ico" },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'use-credentials' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+Pro:wght@300;400;700&display=swap' }
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

setLocale({
  mixed: {
    required: "El campo es obligatorio",
  },
  string: {
    max: "El campo tiene que tener maximo ${max} caracteres",
  },
  number: {
    positive: "El número tiene que ser positivo",
    integer: "El número tiene que ser entero",
    max: "El número tiene que ser menor o igual que ${max} digitos",
  },
});

export default function App() {

  return (
    <html lang="en" className="h-full bg-primary-50">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UiView weight="50">
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </UiView>
      </body>
    </html>
  );
}
