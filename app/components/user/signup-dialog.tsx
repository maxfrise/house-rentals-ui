import React, { useCallback } from 'react';

import { UiDialog, UiDialogType, useDialog } from '@uireact/dialog';
import { useViewport } from '@uireact/foundation';

import { AccountTypeSelector } from './account-type-selector';

export const SignUpDialog: React.FC = () => {
  const dialogId = 'sign-up-dialog';
  const { actions } = useDialog(dialogId);
  const { isSmall } = useViewport();

  const onSuccessSignUp = useCallback(() => {
    actions.closeDialog();
  }, [actions]);

  return (
    <UiDialog dialogId={dialogId} title='Registrate' type={isSmall ? UiDialogType.FULLSCREEN : UiDialogType.CENTERED}>
      <AccountTypeSelector onSuccessSignUp={onSuccessSignUp} />
    </UiDialog>
  )
};
