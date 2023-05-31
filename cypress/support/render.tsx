import React from 'react';

import { UiView } from '@uireact/view';
import { ThemeColor } from '@uireact/foundation';

import { MaxfriseTheme } from '../../app/theme';

export const render = (component: React.ReactElement) => {
  cy.mount(
    <UiView selectedTheme={ThemeColor.light} theme={MaxfriseTheme}>
      <>{component}</>
    </UiView>
  )
};
