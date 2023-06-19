import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import { UiDialog, UiDialogType, useDialog } from '@uireact/dialog';
import type { UiSpacingProps } from '@uireact/foundation';
import { TextSize } from '@uireact/foundation';
import { UiSpacing, useViewport } from '@uireact/foundation';
import { UiGrid, UiGridItem } from '@uireact/grid';

import { SignUpForm } from './signup-form';
import { UiHeading, UiText } from '@uireact/text';
import { UiButton } from '@uireact/button';
import { UiFlexGrid } from '@uireact/flex-grid';

const Div = styled.div`
  > div {
    min-height: 400px;
  }

  .real-state-sticker {
    width: 75px;
  }

  .centered {
    margin: 0 auto;
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

  @-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
  }

  @-webkit-keyframes spin { 
      100% { -webkit-transform: rotate(360deg); } 
  }

  @keyframes spin { 
      100% { 
          -webkit-transform: rotate(360deg); 
          transform:rotate(360deg); 
      } 
  }
`;

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { block: 'five' };

type AccountTypeSelectorProps = {
  onSuccessSignUp?: () => void;
};

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ onSuccessSignUp }: AccountTypeSelectorProps) => {
  const [viewSelected, setViewSelected] = useState('');
  const { isSmall } = useViewport();

  const selectIndividualView = useCallback(() => {
    setViewSelected('individual-account');
  }, []);

  const selectRealEstateView = useCallback(() => {
    setViewSelected('real-estate-account');
  }, []);

  const handleBackClick = useCallback(() => {
    setViewSelected('');
  }, []);

  const handleSuccessSignUp = useCallback(() => {
    onSuccessSignUp?.();
  }, [onSuccessSignUp]);

  return (
    <Div>
      {viewSelected === '' ? (
        <UiGrid cols={isSmall ? 1 : 2} colSize={isSmall ? '100%' : '300px'}>
          <UiGridItem>
            <UiButton fullHeight fullWidth cristal className='rotate-imagery-on-hover' onClick={selectIndividualView}>
              {isSmall ? (
                <UiSpacing padding={titlePadding}>
                  <UiHeading centered>Individual</UiHeading>
                </UiSpacing>
              ) : (
                <UiHeading centered>Individual</UiHeading>
              )}
              <UiSpacing margin={imageMargin}>
                <img src="/_static/real-estate.png" alt="individual-logo" aria-hidden className='centered' />
              </UiSpacing>
              <UiText size={TextSize.small}>Cuenta para personas individuales que necesitan administrar sus propiedades.</UiText>
            </UiButton>
          </UiGridItem>
          <UiGridItem>
            <UiButton fullHeight fullWidth cristal className='rotate-imagery-on-hover' onClick={selectRealEstateView}>
              {isSmall ? (
                <UiSpacing padding={titlePadding}>
                  <UiHeading centered>Inmobiliaria</UiHeading>
                </UiSpacing>
              ) : (
                <UiHeading centered>Inmobiliaria</UiHeading>
              )}
              <UiSpacing margin={imageMargin}>
                <img src="/_static/real-estate-graphs.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker centered' />
                <UiFlexGrid alignItems='center' justifyContent='center'>
                  <img src="/_static/real-estate-deal.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker' />
                  <img src="/_static/real-estate-key.png" alt="inmobiliaria-logo" aria-hidden className='real-state-sticker' />
                </UiFlexGrid>
              </UiSpacing>
              <UiText size={TextSize.xsmall}>Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.</UiText>
            </UiButton>
          </UiGridItem>
        </UiGrid>
      )
        :
      (
        <div>
          <SignUpForm onBackClick={handleBackClick} onSignUpSuccess={handleSuccessSignUp} />
        </div>
      )}
    </Div>
  )
};