import React from 'react';

import { unstable_createRemixStub } from '@remix-run/testing';

import { UiView } from '@uireact/view';
import { ThemeColor } from '@uireact/foundation';

import { MaxfriseTheme } from '../../app/theme';

type StubbedPath = {
  path: string,
  action: () => any,
  loader: () => any,
  element: React.ReactElement
}

export const render = (component: React.ReactElement, stubedPaths: StubbedPath[] = []) => {
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
