import React, { useCallback, useState } from 'react';

import { UiButton } from '@uireact/button';
import { useDialog } from '@uireact/dialog';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport } from '@uireact/foundation';
import { UiHeader } from '@uireact/header';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';
import { UiIcon } from '@uireact/icons';
import { UiMenu } from '@uireact/menu';

import { useOptionalUser } from '../../utils';
import { LoginDialog, LogoutForm } from '../user';
import { HeaderMenu } from './menu';
import { Logo } from '../branding';
import { useNavigate } from '@remix-run/react';

const headerButtonsTextSpacing: UiSpacingProps['padding'] = { inline: 'three' };
const headerSmallSpacing: UiSpacingProps['padding'] = { inline: 'four' };

export const Header: React.FC = () => {
  const loginDialog = useDialog('login-dialog');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const user = useOptionalUser();

  const openLoginDialog = useCallback(() => {
    if (menuVisible) {
      setMenuVisible(false);
    }

    loginDialog.actions.openDialog();
  }, [loginDialog.actions, menuVisible]);

  const navigateToSignUpFlow = useCallback(() => {
    if (menuVisible) { 
      setMenuVisible(false);
    }

    navigate('join/');
  }, [menuVisible, navigate]);

  const toggleMenu = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);

  const onLogoutCB = useCallback(() => {
    setMenuVisible(!menuVisible);
  }, [menuVisible]);

  return (
    <>
      <UiHeader testId='UiHeader'>
        <UiViewport criteria='l|xl'>
            <UiFlexGrid gap='three' justifyContent='space-between'>
              <UiFlexGridItem>
                <Logo />
              </UiFlexGridItem>
              <UiFlexGridItem>
                <UiFlexGrid className='full-height' columnGap={'four'}>
                  {!user ? (
                    <>
                      <UiButton category='primary' onClick={openLoginDialog}>
                        <UiSpacing padding={headerButtonsTextSpacing}>
                          Iniciar Sesion
                        </UiSpacing>
                      </UiButton>
                        <UiButton category='positive' onClick={navigateToSignUpFlow}>
                          <UiSpacing padding={headerButtonsTextSpacing}>
                            Registrate
                          </UiSpacing>
                        </UiButton>
                    </>
                  ) :
                  (
                    <LogoutForm />
                  )}
                </UiFlexGrid>
              </UiFlexGridItem>
            </UiFlexGrid>
        </UiViewport>
        <UiViewport criteria='s|m'>
          <UiSpacing padding={headerSmallSpacing}>
            <UiFlexGrid>
              <UiFlexGridItem grow={1}>
                <Logo />
              </UiFlexGridItem>
              <UiFlexGridItem align='auto'>
                <UiButton fullWidth fullHeight onClick={toggleMenu} testId='header-menu-toogle'>
                    <UiIcon icon='MenuBurger' />
                </UiButton>
                <UiMenu visible={menuVisible} closeMenuCB={toggleMenu}>
                  <HeaderMenu
                    openLoginDialog={openLoginDialog}
                    openSignUiDialog={navigateToSignUpFlow}
                    onLogoutCB={onLogoutCB}
                  />
                </UiMenu>
              </UiFlexGridItem>  
            </UiFlexGrid>
          </UiSpacing>
        </UiViewport>
      </UiHeader>
      <LoginDialog />
    </>
  );
};

Header.displayName = 'Header';
