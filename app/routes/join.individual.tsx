import { useCallback } from 'react';

import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiHeading } from '@uireact/text';

import { IndividualSignUpForm } from '~/components/user/sign-up-forms';
import { SignUpProgressIndicator } from '~/components/user/sign-up-progress-indicator';
import { UiCard } from '@uireact/card';
import { useNavigate } from '@remix-run/react';

const headingMargin: UiSpacingProps['margin'] = { block: 'five' };

export default function JoinIndividual() {
  const navigate = useNavigate();
  const onBackClick = useCallback(() => {
    navigate('../');
  }, [navigate]);

  return (
    <div className='centeredPage'>
      <SignUpProgressIndicator currentIndex={2} />
      <UiSpacing margin={headingMargin}>
        <UiHeading>Paso 2. Llena tu informacion de usuario</UiHeading>
      </UiSpacing>
      <UiCard category='primary'>
        <IndividualSignUpForm onBackClick={onBackClick} />
      </UiCard>
    </div>
  );
};
