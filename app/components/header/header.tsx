import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import { UiButton } from '@uireact/button';
import { useDialog } from '@uireact/dialog';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport } from '@uireact/foundation';
import { UiHeader } from '@uireact/header';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';
import { UiIcon } from '@uireact/icons';
import { UiMenu } from '@uireact/menu';

import { useOptionalUser } from '../../utils';
import { LoginDialog, LogoutForm } from '../user';
import { HeaderMenu } from './menu';
import { Logo } from '../branding';
import { useNavigate } from '@remix-run/react';

type HeaderProps = {
  toggleTheme?: () => void;
}

const CenteredDiv = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const headerButtonsTextSpacing: UiSpacingProps['padding'] = { inline: 'three' };
const headerSmallSpacing: UiSpacingProps['padding'] = { inline: 'four' };

export const Header: React.FC<HeaderProps> = ({ toggleTheme }: HeaderProps) => {
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
    <UiHeader>
      <UiViewport criteria='l|xl'>
        <CenteredDiv>
          <UiFlexGrid gap='three' justifyContent='space-between'>
            <UiFlexGridItem>
              <Logo />
            </UiFlexGridItem>
            <UiFlexGridItem>
                <UiFlexGrid className='full-height' columnGap={'four'}>
                {!user ? (
                  <>
                    <UiButton theme='primary' onClick={openLoginDialog} fullHeight cristal>
                      <UiSpacing padding={headerButtonsTextSpacing}>
                        Iniciar Sesion
                      </UiSpacing>
                    </UiButton>
                      <UiButton theme='positive' onClick={navigateToSignUpFlow} fullHeight>
                        <UiSpacing padding={headerButtonsTextSpacing}>
                          Registrate
                        </UiSpacing>
                      </UiButton>
                  </>
                ) :
                (
                  <LogoutForm />
                )}
                {toggleTheme && (
                  <UiButton onClick={toggleTheme} testId='theme-toggle' cristal>
                    <UiIcon icon='ColorDrop' />
                  </UiButton>
                )}
              </UiFlexGrid>
            </UiFlexGridItem>
          </UiFlexGrid>
        </CenteredDiv>
      </UiViewport>
        <UiViewport criteria='s|m'>
          <UiSpacing padding={headerSmallSpacing}>
            <UiFlexGrid>
              <UiFlexGridItem grow={1}>
                <Logo />
              </UiFlexGridItem>
              <UiFlexGridItem align='auto'>
                <UiButton fullWidth fullHeight onClick={toggleMenu} testId='header-menu-toogle' cristal>
                    <UiIcon icon='Discord' />  
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
