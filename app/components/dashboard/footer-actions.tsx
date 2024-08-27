import React from 'react';

import styled from 'styled-components';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { ColorTokens, UiViewport } from '@uireact/foundation';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';

import { AddHouseButton, HomeButton } from './buttons';

const Div = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const actionsPadding: UiSpacingProps['padding'] = { block: 'four' };

export const FooterActions = () => (
  <UiViewport criteria={'s|m'}>
    <Div>
      <UiCard weight={ColorTokens.token_200} noPadding squared>
        <UiNavbar stretchItems testId='footer-actions'>
          <UiNavbarItem>
            <HomeButton padding={actionsPadding} />
          </UiNavbarItem>
          <UiNavbarItem>
            <AddHouseButton padding={actionsPadding} />
          </UiNavbarItem>
        </UiNavbar>
      </UiCard>
    </Div>
  </UiViewport>
);