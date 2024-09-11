import React from 'react';

import { UiFlexGrid } from '@uireact/flex';
import { UiPrimaryButton, UiSecondaryButton } from '@uireact/button';
import { UiSpacing } from '@uireact/foundation';

import { useOptionalUser } from '../../utils';
import { LogoutForm  } from '../user';

type HeaderMenuProps = {
  openLoginDialog: () => void;
  openSignUiDialog: () => void;
  onLogoutCB?: () => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ onLogoutCB, openLoginDialog, openSignUiDialog }: HeaderMenuProps) => {
  const user = useOptionalUser();

  return (
    <div>
      <UiSpacing padding={{ all: 'three'}}>
        <UiFlexGrid direction='column' gap='three'>
          {!user ? (
            <>
              <UiSecondaryButton onClick={openLoginDialog}>
                <UiSpacing padding={{ block: 'two', inline: 'three' }}>
                  Iniciar sesion
                </UiSpacing>
              </UiSecondaryButton>
              <UiPrimaryButton onClick={openSignUiDialog}>
                <UiSpacing padding={{ block: 'two', inline: 'three' }}>
                  Registrate
                </UiSpacing>
              </UiPrimaryButton>
            </>
          ): (
              <LogoutForm onLogout={onLogoutCB}/>
          )}
        </UiFlexGrid>
      </UiSpacing>
    </div>
  )
};
