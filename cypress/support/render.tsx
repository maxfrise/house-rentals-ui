import React from 'react';

import { unstable_createRemixStub } from '@remix-run/testing';

import { UiView } from '@uireact/view';
import { ThemeColor } from '@uireact/foundation';

import { MaxfriseTheme } from '../../app/theme';

export const render = (component: React.ReactElement) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: '/',
      element: <UiView selectedTheme={ThemeColor.light} theme={MaxfriseTheme}>
        <>{component}</>
      </UiView>,
    },
    {
      path: '/login',
      action: async () => {
        return {
          errors: null,
          userId: 'xxxxx'
        } },
      loader: async () => { return { ok: true } },
      element: <p>Login route</p>
    },
    {
      path: '/houses',
      action: async () => { return { ok: true } },
      loader: async () => { return { ok: true } },
      element: <p>Houses route</p>
    }
  ]);
  
  cy.mount(<RemixStub />);
};
