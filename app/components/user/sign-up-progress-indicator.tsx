import React from 'react';

import { Link } from '@remix-run/react';
import { UiCard } from '@uireact/card';
import { UiProgressIndicator, UiProgressIndicatorItem } from '@uireact/progress-indicator';
import { UiLink, UiText } from '@uireact/text';

type SignUpProgressIndicatorProps = {
  currentIndex: number;
  isAgency?: boolean;
}

export const SignUpProgressIndicator = ({ currentIndex, isAgency }: SignUpProgressIndicatorProps) => (
  <UiCard category='primary'>
    <UiProgressIndicator current={currentIndex}>
      <UiProgressIndicatorItem>
        {currentIndex === 2 ? (
          <UiLink fontStyle='bold' category='fonts'>
            <Link to="../">
              1. Tipo de cuenta: {isAgency ? 'Inmobiliaria' : 'Individual'}
            </Link>
          </UiLink>
        ) : (
          <UiText category={currentIndex > 2 ? 'positive' : undefined}>
            1. Tipo de cuenta
          </UiText>  
        )}
      </UiProgressIndicatorItem>
      <UiProgressIndicatorItem>
        <UiText fontStyle={currentIndex > 2 ? 'bold' : undefined}>
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