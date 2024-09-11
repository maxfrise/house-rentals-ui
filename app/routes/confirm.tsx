import React from 'react';

import type { MetaFunction} from '@remix-run/node';

import { ConfirmEmail } from '../components/user';
import { UiViewRow } from '@uireact/view';

export const meta: MetaFunction = () => [{ title: "Verifica tu correo" }];

export default function Confirm() {
  return (
    <UiViewRow weight='50' centeredContent>
      <div className='centeredPage'>
        <ConfirmEmail />
      </div>
    </UiViewRow>
  );
};
