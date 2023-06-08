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
import { useCallback, useEffect, useState } from "react";
import { setLocale } from "yup";

import { ThemeColor } from "@uireact/foundation";
import { UiView } from '@uireact/view';

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import { getUser } from "~/session.server";
import { MaxfriseTheme } from './theme';
import { Header } from './components/header';
import { useThemeDetector } from "./hooks";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  // NOTE: Architect deploys the public directory to /_static/
  { rel: "icon", href: "/_static/favicon.ico" },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'use-credentials' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap' }
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
  const isDarkTheme = useThemeDetector();
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>(isDarkTheme ? ThemeColor.dark : ThemeColor.light);

  const toggleTheme = useCallback(() => {
    setSelectedTheme(selectedTheme => selectedTheme === ThemeColor.light ? ThemeColor.dark : ThemeColor.light);
  }, [setSelectedTheme]);

  useEffect(() => { 
    setSelectedTheme(isDarkTheme ? ThemeColor.dark : ThemeColor.light);
  }, [isDarkTheme])
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined"
          ? "__STYLES__"
          : null}
      </head>
      <body className="">
        <UiView theme={MaxfriseTheme} selectedTheme={selectedTheme}>
          <Header toggleTheme={toggleTheme} />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </UiView>
      </body>
    </html>
  );
}
