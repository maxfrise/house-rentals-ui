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
import { LoginDialog } from '../user';
import { useDialog } from '@uireact/dialog';

type HeaderProps = {
  toggleTheme?: () => void;
}

const CenteredDiv = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const signInButtonSpacing: UiSpacingProps['padding'] = { inline: 'three' };

export const Header: React.FC<HeaderProps> = ({ toggleTheme }: HeaderProps) => {
  const { actions } = useDialog('login-dialog');
  const user = useOptionalUser();

  const openDialog = useCallback(() => {
    actions.openDialog();
  }, [actions]);

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
                <UiButton theme='positive' onClick={openDialog}>
                  <UiSpacing padding={signInButtonSpacing}>
                    Log in
                  </UiSpacing>
                </UiButton>
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
    </>
  );
};

Header.displayName = 'Header';
