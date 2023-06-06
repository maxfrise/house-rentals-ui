import React, { useCallback, useState } from 'react';

import { Link } from '@remix-run/react';

import styled from 'styled-components';

import { UiButton } from '@uireact/button';
import { useDialog } from '@uireact/dialog';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport } from '@uireact/foundation';
import { UiHeader } from '@uireact/header';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';
import { UiHeading } from '@uireact/text';
import { UiIcon } from '@uireact/icons';
import { UiMenu } from '@uireact/menu';

import { useOptionalUser } from '../../utils';
import { LoginDialog, LogoutForm, SignUpDialog } from '../user';
import { HeaderMenu } from './menu';

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
  const signUpDialog = useDialog('sign-up-dialog');
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useOptionalUser();

  const openLoginDialog = useCallback(() => {
    if (menuVisible) {
      setMenuVisible(false);
    }

    loginDialog.actions.openDialog();
  }, [loginDialog.actions, menuVisible]);

  const openSignUpDialog = useCallback(() => {
    if (menuVisible) { 
      setMenuVisible(false);
    }

    signUpDialog.actions.openDialog();
  }, [menuVisible, signUpDialog.actions]);

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
            <UiFlexGrid gap='three'>
            <UiFlexGridItem grow={1}>
                <Link to='/'><UiHeading>Maxfrise</UiHeading></Link>
            </UiFlexGridItem>
              {!user ? (
                <>
                <UiFlexGridItem>
                  <UiButton theme='primary' onClick={openLoginDialog} fullHeight>
                    <UiSpacing padding={headerButtonsTextSpacing}>
                      Iniciar Sesion
                    </UiSpacing>
                  </UiButton>
                  </UiFlexGridItem>
                  <UiFlexGridItem>
                    <UiButton theme='positive' onClick={openSignUpDialog} fullHeight>
                      <UiSpacing padding={headerButtonsTextSpacing}>
                        Registrate
                      </UiSpacing>
                    </UiButton>
                  </UiFlexGridItem>
                </>
              ) :
              (
                <LogoutForm />
              )}
            {toggleTheme && (
              <UiButton onClick={toggleTheme} testId='theme-toggle'>
                <UiIcon icon='ColorDrop' />
              </UiButton>
            )}
          </UiFlexGrid>
        </CenteredDiv>
      </UiViewport>
        <UiViewport criteria='s|m'>
          <UiSpacing padding={headerSmallSpacing}>
            <UiFlexGrid>
              <UiFlexGridItem grow={1}>
                <Link to='/'><UiHeading>Maxfrise</UiHeading></Link>
              </UiFlexGridItem>
              <UiFlexGridItem align='auto'>
                <UiButton fullWidth fullHeight onClick={toggleMenu} testId='header-menu-toogle'>
                    <UiIcon icon='Discord' />  
                </UiButton>
                <UiMenu visible={menuVisible} closeMenuCB={toggleMenu}>
                  <HeaderMenu
                    openLoginDialog={openLoginDialog}
                    openSignUiDialog={openSignUpDialog}
                    onLogoutCB={onLogoutCB}
                  />
                </UiMenu>
              </UiFlexGridItem>  
            </UiFlexGrid>
          </UiSpacing>
      </UiViewport>
      </UiHeader>
      <LoginDialog />
      <SignUpDialog />
    </>
  );
};

Header.displayName = 'Header';
