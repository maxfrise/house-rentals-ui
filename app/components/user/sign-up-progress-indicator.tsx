import React from 'react';

import { UiCard } from '@uireact/card';
import { UiProgressIndicator, UiProgressIndicatorItem } from '@uireact/progress-indicator';
import { UiLink, UiText } from '@uireact/text';

type SignUpProgressIndicatorProps = {
  currentIndex: number;
  isAgency?: boolean;
}

export const SignUpProgressIndicator = ({ currentIndex, isAgency }: SignUpProgressIndicatorProps) => (
  <UiCard>
    <UiProgressIndicator current={currentIndex}>
      <UiProgressIndicatorItem>
        {currentIndex === 2 ? (
          <UiLink href='../' useReactLink theme='positive'>
            1. Tipo de cuenta: {isAgency ? 'Inmobiliaria' : 'Individual'}
          </UiLink>
        ) : (
          <UiText fontStyle='regular' theme={currentIndex > 2 ? 'positive' : undefined}>
            1. Tipo de cuenta
          </UiText>  
        )}
      </UiProgressIndicatorItem>
      <UiProgressIndicatorItem>
        <UiText theme={currentIndex > 2 ? 'positive' : undefined}>
          2. Informacion de la cuenta
        </UiText>
      </UiProgressIndicatorItem>
      <UiProgressIndicatorItem>
        <UiText>
          3. Confirma tu correo
        </UiText>
      </UiProgressIndicatorItem>
    </UiProgressIndicator>
  </UiCard>
);