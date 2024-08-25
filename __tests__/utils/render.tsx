import React from 'react';

import { unstable_createRemixStub } from '@remix-run/testing';

import { UiView, UiViewRow } from '@uireact/view';
import { ThemeColor, UiSpacing } from '@uireact/foundation';

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
      element: (
        <>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com" rel="preconnect" crossOrigin="use-credentials" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+Pro:wght@300;400;700&display=swap" rel="stylesheet" />
          <UiView>
            <UiViewRow weight='50'>
              <UiSpacing padding={{all: 'four'}}>
                <>{component}</>
              </UiSpacing>
            </UiViewRow>
          </UiView>
        </>
      ),
    },
    ...stubedPaths
  ]);
  
  cy.mount(<RemixStub />);
};
