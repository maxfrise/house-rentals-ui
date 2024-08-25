import React, { useCallback } from 'react';

import { useNavigate } from '@remix-run/react';

import { UiButton } from '@uireact/button';
import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { TextSize, UiSpacing } from '@uireact/foundation';
import { UiHeading, UiText } from '@uireact/text';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { top: 'five' };
const textMargin: UiSpacingProps['margin'] = { bottom: 'four' };

export const IndividualAccountSelector = () => {
  const navigate = useNavigate();

  const onSelect = useCallback(() => {
    navigate('individual');
  }, [navigate]);

  return (
    <UiCard className='full-height full-width' padding={{}}>
      <UiButton fullHeight fullWidth styling='clear' className='no-padding rotate-imagery-on-hover' onClick={onSelect}>
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
            <UiText size={TextSize.small}>Cuenta para personas individuales que necesitan administrar sus propiedades.</UiText>
          </UiSpacing>
        </UiFlexGrid>
      </UiButton>
    </UiCard>
  );
};
