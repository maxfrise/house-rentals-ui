import { useCallback } from "react";
import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Breakpoints, UiViewport } from "@uireact/foundation";
import { UiHeader } from "@uireact/header";
import { UiHeading, UiText } from "@uireact/text";
import { UiButton } from '@uireact/button';
import { UiDialog, useDialog } from '@uireact/dialog';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';

import { useOptionalUser } from "~/utils";
import InitialImage from '../../public/initial-image.jpeg';



export const meta: V2_MetaFunction = () => [{ title: "MaxFrise" }];

export default function Index() { 
  const { actions } = useDialog('test-dialog');

  const handleOpenDialog = useCallback(() => {
    actions.openDialog();
  }, [actions]);

  return (
    <>
      <UiHeader centered>
        <UiFlexGrid>
          <UiFlexGridItem grow={1}>
            <UiHeading>Maxfrise</UiHeading>
          </UiFlexGridItem>
          <UiButton onClick={handleOpenDialog} theme="tertiary">Open dialog</UiButton>
        </UiFlexGrid>
      </UiHeader>
      <UiViewport criteria={Breakpoints.XLARGE}>
        <p>XLarge</p>
      </UiViewport>
      <UiViewport criteria={Breakpoints.LARGE}>
        <p>Large</p>
      </UiViewport>
      <UiViewport criteria={Breakpoints.MEDIUM}>
        <p>Medium</p>
      </UiViewport>
      <UiViewport criteria={Breakpoints.SMALL}>
        <p>Small</p>
      </UiViewport>
      <div>
        <UiDialog title="Some dialog" dialogId="test-dialog">
          <UiText>Some text</UiText>
        </UiDialog>
      </div>
    </>
  )
}

/*
export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://www.mothermag.com/wp-content/uploads/2019/03/jonklassen_mothermag-471.jpg"
                alt="Man reading a book"
              />
              <div className="absolute inset-0 bg-[color:rgba(91,96,89,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-red-500 drop-shadow-md">
                  Maxfrise
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Admistramos la renta de tu casa
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/houses"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
                  >
                    ver casas de {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
*/