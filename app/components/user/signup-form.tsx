import React from 'react';

import { useFetcher, useNavigate } from "@remix-run/react";
import { useCallback, useEffect } from "react";

import styled from 'styled-components';

import { UiButton } from "@uireact/button";
import { UiInput } from '@uireact/form';
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing } from "@uireact/foundation";
import { UiText } from "@uireact/text";

import type { action } from '../../routes/login';

const submitButtonMargin: UiSpacingProps['margin'] = { block: 'four' };

export type SignUpFormProps = {
  onBackClick?: () => void;
  onSignUpSuccess?: () => void;
}

const FormDiv = styled.div`
  width: 300px;
`

export const SignUpForm: React.FC<SignUpFormProps> = ({ onBackClick, onSignUpSuccess }: SignUpFormProps) => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  useEffect(() => {
    if (fetcher.data?.errors === null && fetcher.data?.userId !== '') {
      onSignUpSuccess?.();
      navigate("/houses");
    }
  }, [fetcher, navigate, onSignUpSuccess]);

  return (
    <FormDiv>
      <fetcher.Form method="post" action="/join" role="form">
        <UiInput
          label="Correo electronico"
          labelOnTop
          type="email"
          name="email"
          error={fetcher.data?.errors?.email || undefined}
          theme={fetcher.data?.errors?.email ? 'error' : undefined}
        />
        <UiInput
          label="Contraseña"
          labelOnTop
          type="password"
          name="password"
          error={fetcher.data?.errors?.password || undefined}
          theme={fetcher.data?.errors?.password ? 'error' : undefined}
        />
        <input type="hidden" name="redirectTo" value={'/houses'} />
        {fetcher.state !== 'idle' && <UiText>Creating account...</UiText>}
        <UiSpacing margin={submitButtonMargin}>
          <UiButton type="submit" fullWidth disabled={fetcher.state !== 'idle'}>Crear cuenta</UiButton>
        </UiSpacing>
        {onBackClick && <UiButton theme="negative" fullWidth type="button" onClick={handleBackClick}>Regresar</UiButton>}
      </fetcher.Form>
    </FormDiv>
  );
}
