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

const submitButtonMargin: UiSpacingProps['margin'] = {block: 'four'};

export type LoginFormProps = {
  onBackClick?: () => void;
  onLoginSuccess?: () => void;
}

const FormDiv = styled.div`
  width: 300px;
`

export const LoginForm: React.FC<LoginFormProps> = ({ onBackClick, onLoginSuccess }: LoginFormProps) => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  useEffect(() => {
    if (fetcher.data?.errors === null && fetcher.data?.userId !== '') { 
      onLoginSuccess?.();
      navigate("/houses");
    }
  }, [fetcher, navigate, onLoginSuccess]);

  return (
    <FormDiv>
      <fetcher.Form method="post" action="/login" role="form">
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
          type="pass"
          name="pass"
          error={fetcher.data?.errors?.password || undefined}
          theme={fetcher.data?.errors?.password ? 'error' : undefined}
        />
        <input type="hidden" name="redirectTo" value={'/houses'} />
        {fetcher.state === 'loading' && <UiText>Loading...</UiText>}
        {fetcher.state === 'submitting' && <UiText>Submitting...</UiText>}
        <UiSpacing margin={submitButtonMargin}>
          <UiButton type="submit" fullWidth disabled={fetcher.state !== 'idle'}>Iniciar sesion</UiButton>
        </UiSpacing>
        {onBackClick && <UiButton theme="negative" fullWidth type="button" onClick={handleBackClick}>Regresar</UiButton>}
      </fetcher.Form>
    </FormDiv>
  );
}
