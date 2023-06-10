import React from 'react';

import { UiDialog, useDialog } from '@uireact/dialog';

import PayHouseform from "./dashboard/forms/PayHouseForm"
import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import type { Payment } from '~/datasource/MaxfriseApi/MaxfriseApiTypes';

const formSpacing: UiSpacingProps['margin'] = { all: 'four' };

export const PayHouseDialog: React.FC<{ payment: Payment | undefined }> = ({ payment }) => {
  const dialogId = 'pay-house-dialog';
  const { actions } = useDialog(dialogId);

  const onPaymentSubmitted = () => {
    actions.closeDialog()
  }

  return (
    <UiDialog dialogId={dialogId} title='Pago mensual'>
      <UiSpacing margin={formSpacing}>
        <PayHouseform
          onPaymentSubmitted={onPaymentSubmitted}
          payment={payment}
        />
      </UiSpacing>
    </UiDialog>
  )
};