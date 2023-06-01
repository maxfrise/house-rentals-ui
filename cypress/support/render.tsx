import React from 'react';

import { unstable_createRemixStub } from '@remix-run/testing';

import { UiView } from '@uireact/view';
import { ThemeColor } from '@uireact/foundation';

import { MaxfriseTheme } from '../../app/theme';

export const render = (component: React.ReactElement, stubedPaths: any = []) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: '/',
      element: <UiView selectedTheme={ThemeColor.light} theme={MaxfriseTheme}>
        <>{component}</>
      </UiView>,
    },
    ...stubedPaths
  ]);
  
  cy.mount(<RemixStub />);
};
