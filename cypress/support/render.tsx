import React from 'react';

import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

import { UiView } from '@uireact/view';
import { ThemeColor } from '@uireact/foundation';

import { MaxfriseTheme } from '../../app/theme';

export const render = (component: React.ReactElement) => {
  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <UiView selectedTheme={ThemeColor.light} theme={MaxfriseTheme}>
            <>{component}</>
          </UiView>
        }
      />
    ),
    {
      basename: "/",
      initialEntries: ["/"],
    }
  );
  
  cy.mount(<RouterProvider router={router} />);
};
