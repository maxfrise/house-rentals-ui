import React from 'react';

import { UiButton } from '@uireact/button';
import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { TextSize, UiSpacing } from '@uireact/foundation';
import { UiHeading, UiText } from '@uireact/text';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { top: 'five' };
const textMargin: UiSpacingProps['margin'] = { bottom: 'four' };

type IndividualAccountSelectorProps = {
  onClick: () => void;
}

export const IndividualAccountSelector = ({ onClick }: IndividualAccountSelectorProps) => (
  <UiCard noPadding className='full-height full-width'>
    <UiButton fullHeight fullWidth cristal className='no-padding rotate-imagery-on-hover' onClick={onClick}>
      <UiFlexGrid direction='column' className='full-height' justifyContent='center' alignItems='stretch'>
        <UiFlexGridItem grow={1}>
          <UiSpacing padding={titlePadding}>
            <UiHeading centered>Individual</UiHeading>
          </UiSpacing>
        </UiFlexGridItem>
        <UiFlexGridItem grow={1}>
          <UiSpacing margin={imageMargin}>
            <img src="/_static/real-estate.png" alt="individual-logo" aria-hidden className='centered' />
          </UiSpacing>
        </UiFlexGridItem>
        <UiSpacing margin={textMargin}>
          <UiText size={TextSize.small} fontStyle='regular'>Cuenta para personas individuales que necesitan administrar sus propiedades.</UiText>
        </UiSpacing>
      </UiFlexGrid>
    </UiButton>
  </UiCard>
);