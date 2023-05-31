import React, { useCallback } from 'react';

import { UiDialog, useDialog } from '@uireact/dialog';

import { LoginForm } from '.';
import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';

const formSpacing: UiSpacingProps['margin'] = { all: 'four' };

export const LoginDialog: React.FC = () => {
  const dialogId = 'login-dialog';
  const { actions } = useDialog(dialogId);

  const handleBackClick = useCallback(() => { 
    actions.closeDialog();
  }, [actions]);

  return (
    <UiDialog dialogId={dialogId} title='Inicia sesion'>
      <UiSpacing margin={formSpacing}>
        <LoginForm onBackClick={handleBackClick} />
      </UiSpacing>
    </UiDialog>
  )
};
