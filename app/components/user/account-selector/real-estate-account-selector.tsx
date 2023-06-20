import React from 'react';

import { UiButton } from '@uireact/button';
import { UiCard } from '@uireact/card';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, TextSize } from '@uireact/foundation';
import { UiHeading, UiText } from '@uireact/text';

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { block: 'five' };
const textMargin: UiSpacingProps['margin'] = { bottom: 'four' };

type RealEstateAccountSelectorProps = {
  onClick: () => void;
}

export const RealEstateAccountSelector = ({ onClick }: RealEstateAccountSelectorProps) => (
  <UiCard noPadding className='full-height full-width'>
    <UiButton fullHeight fullWidth cristal className='no-padding rotate-imagery-on-hover' onClick={onClick}>
      <UiFlexGrid direction='column' className='full-height' justifyContent='center' alignItems='stretch'>
        <UiFlexGridItem grow={1}>
          <UiSpacing padding={titlePadding}>
            <UiHeading centered>Inmobiliaria</UiHeading>
          </UiSpacing>
        </UiFlexGridItem>
        <UiFlexGridItem grow={1}>
          <UiSpacing margin={imageMargin}>
            <img src="/_static/real-estate-graphs.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker centered' />
            <UiFlexGrid alignItems='center' justifyContent='center'>
              <img src="/_static/real-estate-deal.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker' />
              <img src="/_static/real-estate-key.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker' />
            </UiFlexGrid>
          </UiSpacing>
        </UiFlexGridItem>
        <UiSpacing margin={textMargin}>
          <UiText size={TextSize.small} fontStyle='regular'>Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.</UiText>
        </UiSpacing>
      </UiFlexGrid>
    </UiButton>
  </UiCard>
);