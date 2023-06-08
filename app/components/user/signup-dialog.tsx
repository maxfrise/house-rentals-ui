import React, { useCallback } from 'react';

import { UiDialog, useDialog } from '@uireact/dialog';

import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';

import { SignUpForm } from './signup-form';

const formSpacing: UiSpacingProps['margin'] = { all: 'four' };

export const SignUpDialog: React.FC = () => {
  const dialogId = 'sign-up-dialog';
  const { actions } = useDialog(dialogId);

  const handleBackClick = useCallback(() => {
    actions.closeDialog();
  }, [actions]);

  const handleSuccessSignUp = useCallback(() => {
    actions.closeDialog();
  }, [actions]);

  return (
    <UiDialog dialogId={dialogId} title='Registrate'>
      <UiSpacing margin={formSpacing}>
        <SignUpForm onBackClick={handleBackClick} onSignUpSuccess={handleSuccessSignUp} />
      </UiSpacing>
    </UiDialog>
  )
};
