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

type StubbedCurrentPath = {
  path: string,
  loader: () => any,
  id: string,
}

export const render = (component: React.ReactElement, stubedPaths: StubbedPath[] = [], currentPath?: StubbedCurrentPath) => {
  const RemixStub = unstable_createRemixStub([
    {
      path: currentPath?.path || '/',
      loader: currentPath?.loader,
      id: currentPath?.id,
      element: <UiView selectedTheme={ThemeColor.light} theme={MaxfriseTheme}>
        <>{component}</>
      </UiView>,
    },
    ...stubedPaths
  ]);
  
  cy.mount(<RemixStub />);
};
