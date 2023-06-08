import React from 'react';

import styled from 'styled-components';

import { UiFlexGrid } from '@uireact/flex-grid';
import { UiButton } from '@uireact/button';
import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';

import { useOptionalUser } from '../../utils';
import { LogoutForm  } from '../user';

const Div = styled.div`
  width: 200px;
`;

type HeaderMenuProps = {
  openLoginDialog: () => void;
  openSignUiDialog: () => void;
  onLogoutCB?: () => void;
}

const menuItemSpacing: UiSpacingProps['margin'] = { block: 'three' };
const buttonSpacing: UiSpacingProps['padding'] = { block: 'three' };

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ onLogoutCB, openLoginDialog, openSignUiDialog }: HeaderMenuProps) => {
  const user = useOptionalUser();

  return (
    <Div>
      <UiFlexGrid direction='column'>
        {!user ? (
          <>
            <UiSpacing margin={menuItemSpacing}>
              <UiButton onClick={openLoginDialog} fullWidth theme='primary'>
                <UiSpacing padding={buttonSpacing}>
                  Iniciar sesion
                </UiSpacing>
              </UiButton>
            </UiSpacing>
            <UiSpacing margin={menuItemSpacing}>
              <UiButton onClick={openSignUiDialog} fullWidth theme='positive'>
                <UiSpacing padding={buttonSpacing}>
                  Registrate
                </UiSpacing>
              </UiButton>
            </UiSpacing>
          </>
        ): (
            <LogoutForm onLogout={onLogoutCB}/>
        )}
      </UiFlexGrid>
    </Div>
  )
};
