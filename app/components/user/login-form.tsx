import React from 'react';

import { useFetcher, useSearchParams } from "@remix-run/react";
import { useCallback, useEffect } from "react";

import { UiButton, UiPrimaryButton } from "@uireact/button";
import { UiInput } from '@uireact/form';
import type { UiSpacingProps } from "@uireact/foundation";
import { UiIcon } from '@uireact/icons';

import type { action } from '../../routes/login';
import { useOptionalUser } from '../../utils';

import styles from './login.module.css';

const submitButtonMargin: UiSpacingProps['margin'] = {block: 'four'};

export type LoginFormProps = {
  onBackClick?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onBackClick, onLoginSuccess }: LoginFormProps) => {
  const fetcher = useFetcher<typeof action>();
  const user = useOptionalUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/houses";
  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  useEffect(() => {
    if (user) { 
      onLoginSuccess?.();
    }
  }, [onLoginSuccess, user]);

  return (
    <div className={styles.formContainer}>
      <fetcher.Form method="post" action="/login" role="form">
        <UiInput
          label="Correo electronico"
          labelOnTop
          type="email"
          name="email"
          error={fetcher.data?.errors?.email || undefined}
          category={fetcher.data?.errors?.email ? 'error' : undefined}
        />
        <UiInput
          label="Contraseña"
          labelOnTop
          type="password"
          name="password"
          error={fetcher.data?.errors?.password || undefined}
          category={fetcher.data?.errors?.password ? 'error' : undefined}
        />
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <UiPrimaryButton type="submit" fullWidth disabled={fetcher.state !== 'idle'} margin={submitButtonMargin}>
          Iniciar sesion {fetcher.state !== 'idle' && <UiIcon icon='LoadingSpinner'/>}
        </UiPrimaryButton>
        {onBackClick && <UiButton category="negative" fullWidth type="button" onClick={handleBackClick} styling='clear'>Regresar</UiButton>}
      </fetcher.Form>
    </div>
  );
}
