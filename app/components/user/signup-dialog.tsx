import React, { useCallback } from 'react';

import { UiDialog, UiDialogType, useDialog } from '@uireact/dialog';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, useViewport } from '@uireact/foundation';

import { AccountSelector } from './account-selector';

const selectorMargin: UiSpacingProps['margin'] = { all: 'four' };

export const SignUpDialog: React.FC = () => {
  const dialogId = 'sign-up-dialog';
  const { actions } = useDialog(dialogId);
  const { isSmall } = useViewport();

  const onSuccessSignUp = useCallback(() => {
    actions.closeDialog();
  }, [actions]);

  return (
    <UiDialog dialogId={dialogId} title='Registrate' type={isSmall ? UiDialogType.FULLSCREEN : UiDialogType.CENTERED}>
      <UiSpacing margin={selectorMargin}>
        <AccountSelector onSuccessSignUp={onSuccessSignUp} />
      </UiSpacing>
    </UiDialog>
  )
};
