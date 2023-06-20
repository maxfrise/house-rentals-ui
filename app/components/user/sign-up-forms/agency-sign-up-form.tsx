import React from 'react';

export type SignUpFormProps = {
  onBackClick?: () => void;
  onSignUpSuccess?: () => void;
}

export const AgencySignUpForm = ({ onBackClick, onSignUpSuccess }: SignUpFormProps) => {
  return <p>Agency sign up</p>;
};
