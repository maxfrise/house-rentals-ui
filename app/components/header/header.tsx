import React, { useCallback } from 'react';

import styled from 'styled-components';

import { UiButton } from '@uireact/button';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport } from '@uireact/foundation';
import { UiHeader } from '@uireact/header';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';
import { UiHeading } from '@uireact/text';
import { UiIcon } from '@uireact/icons';

import { useOptionalUser } from '../../utils';
import { LoginDialog, SignUpDialog } from '../user';
import { useDialog } from '@uireact/dialog';

type HeaderProps = {
  toggleTheme?: () => void;
}

const CenteredDiv = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const headerButtonsTextSpacing: UiSpacingProps['padding'] = { inline: 'three' };
const registerButtonSpacing: UiSpacingProps['margin'] = { inline: 'three' };

export const Header: React.FC<HeaderProps> = ({ toggleTheme }: HeaderProps) => {
  const loginDialog = useDialog('login-dialog');
  const signUpDialog = useDialog('sign-up-dialog');
  const user = useOptionalUser();

  const openLoginDialog = useCallback(() => {
    loginDialog.actions.openDialog();
  }, [loginDialog]);

  const openSignUpDialog = useCallback(() => {
    signUpDialog.actions.openDialog();
  }, [signUpDialog]);

  return (
    <>
    <UiHeader>
      <UiViewport criteria='l|xl'>
        <CenteredDiv>
            <UiFlexGrid gap='three'>
            <UiFlexGridItem grow={1}>
              <UiHeading>Maxfrise</UiHeading>
            </UiFlexGridItem>
              {!user && (
                <UiFlexGridItem>
                  <UiButton theme='primary' onClick={openLoginDialog}>
                    <UiSpacing padding={headerButtonsTextSpacing}>
                      Iniciar Sesion
                    </UiSpacing>
                  </UiButton>
                  <UiSpacing margin={registerButtonSpacing} inline>
                    <UiButton theme='positive' onClick={openSignUpDialog}>
                      <UiSpacing padding={headerButtonsTextSpacing}>
                        Registrate
                      </UiSpacing>
                    </UiButton>
                  </UiSpacing>
                </UiFlexGridItem>
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
        <UiFlexGrid>
          <UiFlexGridItem grow={1}>
            <UiHeading>Maxfrise</UiHeading>
          </UiFlexGridItem>
        </UiFlexGrid>
      </UiViewport>
      </UiHeader>
      <LoginDialog />
      <SignUpDialog />
    </>
  );
};

Header.displayName = 'Header';
