import React from 'react';

import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiHeading } from '@uireact/text';

import { AgencyAccountSelector } from './agency-account-selector';
import { IndividualAccountSelector } from './individual-account-selector';
import { SignUpProgressIndicator } from '../sign-up-progress-indicator';
import { UiFlexGrid } from '@uireact/flex';

const headingMargin: UiSpacingProps['margin'] = { block: 'five' };

export const AccountSelector = () => {

  return (
    <div className='centeredPage'>
      <SignUpProgressIndicator currentIndex={1}/>
      <UiSpacing margin={headingMargin}>
        <UiHeading>Paso 1. Elige tu tipo de cuenta</UiHeading>
      </UiSpacing>
      <UiFlexGrid gap='three' wrap='wrap' alignItems='stretch' justifyContent='center'>
        <IndividualAccountSelector />
        <AgencyAccountSelector />
      </UiFlexGrid>
    </div>
  )
};
