import React from 'react';

import { AgencySignUpForm } from '~/components/user/sign-up-forms';
import { SignUpProgressIndicator } from '~/components/user/sign-up-progress-indicator';

export default function JoinRealState() {
  return (
    <>
      <SignUpProgressIndicator currentIndex={2} isAgency/>
      <AgencySignUpForm />
    </>
  );
}