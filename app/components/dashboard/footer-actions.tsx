import React from 'react';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiViewport } from '@uireact/foundation';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';

import { AddHouseButton, HomeButton } from './buttons';

const actionsPadding: UiSpacingProps['padding'] = { block: 'four' };

export const FooterActions = () => (
  <UiViewport criteria={'s|m'}>
    <div>
      <UiCard weight='200' padding={{}}>
        <UiNavbar testId='footer-actions'>
          <UiNavbarItem>
            <HomeButton padding={actionsPadding} />
          </UiNavbarItem>
          <UiNavbarItem>
            <AddHouseButton padding={actionsPadding} />
          </UiNavbarItem>
        </UiNavbar>
      </UiCard>
    </div>
  </UiViewport>
);