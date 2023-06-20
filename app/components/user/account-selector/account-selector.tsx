import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, useViewport } from '@uireact/foundation';
import { UiGrid, UiGridItem } from '@uireact/grid';

import { SignUpForm } from '../signup-form';
import { RealEstateAccountSelector } from './real-estate-account-selector';
import { IndividualAccountSelector } from './individual-account-selector';
import { UiHeading } from '@uireact/text';

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

type AccountTypeSelectorProps = {
  onSuccessSignUp?: () => void;
};

const headingMargin: UiSpacingProps['margin'] = { block: 'five' };

export const AccountSelector: React.FC<AccountTypeSelectorProps> = ({ onSuccessSignUp }: AccountTypeSelectorProps) => {
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
        <>
          <UiSpacing margin={headingMargin}>
            <UiHeading>Paso 1. Elige tu tipo de cuenta</UiHeading>
          </UiSpacing>
          <UiGrid cols={isSmall ? 1 : 2} colSize={isSmall ? '100%' : '300px'} colsGap={10}>
            <UiGridItem>
              <IndividualAccountSelector onClick={selectIndividualView} />
            </UiGridItem>
            <UiGridItem>
              <RealEstateAccountSelector onClick={selectRealEstateView} />
            </UiGridItem>
          </UiGrid>
        </>
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