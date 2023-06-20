import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, useViewport } from '@uireact/foundation';
import { UiGrid, UiGridItem } from '@uireact/grid';
import { UiHeading } from '@uireact/text';

import { AgencyAccountSelector } from './agency-account-selector';
import { IndividualAccountSelector } from './individual-account-selector';
import { SignUpProgressIndicator } from '../sign-up-progress-indicator';

const Div = styled.div`

  .real-state-sticker {
    width: 75px;
  }

  img {
    max-width: 100px;
  }

  .rotate-imagery-on-hover {
    :hover {
      img {
        -webkit-animation:spin .25s linear 1;
        -moz-animation:spin .25s linear 1;
        animation:spin .25s linear 1;
      }
    }
  }
`;

const headingMargin: UiSpacingProps['margin'] = { block: 'five' };

export const AccountSelector = () => {
  const { isSmall } = useViewport();

  return (
    <Div>
      <SignUpProgressIndicator currentIndex={1}/>
      <UiSpacing margin={headingMargin}>
        <UiHeading>Paso 1. Elige tu tipo de cuenta</UiHeading>
      </UiSpacing>
      <UiGrid cols={isSmall ? 1 : 2} colSize={isSmall ? '100%' : '300px'} colsGap={10}>
        <UiGridItem>
          <IndividualAccountSelector />
        </UiGridItem>
        <UiGridItem>
          <AgencyAccountSelector />
        </UiGridItem>
      </UiGrid>
    </Div>
  )
};
