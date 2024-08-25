import type { V2_MetaFunction} from '@remix-run/node';

import { ConfirmEmail } from '../components/user';
import { UiViewRow } from '@uireact/view';
import { UiSpacing } from '@uireact/foundation';
import type { UiSpacingProps } from '@uireact/foundation';

export const meta: V2_MetaFunction = () => [{ title: "Verifica tu correo" }];

const contentSpacing: UiSpacingProps['padding'] = { all: 'five' };

export default function Confirm() {
  return (
    <UiViewRow weight='50' centeredContent>
      <UiSpacing padding={contentSpacing}>
        <div className='centeredPage'>
          <ConfirmEmail />
        </div>
      </UiSpacing>
    </UiViewRow>
  );
};
