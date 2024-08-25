import React from 'react';

import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect } from "react";

import { UiButton } from "@uireact/button";
import { UiInput } from '@uireact/form';
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing } from "@uireact/foundation";
import { UiIcon } from '@uireact/icons';

import type { action } from '../../../routes/join';
import { useOptionalUser } from '../../../utils';

const submitButtonMargin: UiSpacingProps['margin'] = { block: 'four' };
const submitButtonPadding: UiSpacingProps['padding'] = { block: 'four' };

export type IndividualSignUpFormProps = {
  onBackClick?: () => void;
  onSignUpSuccess?: () => void;
}

export const IndividualSignUpForm: React.FC<IndividualSignUpFormProps> = ({ onBackClick, onSignUpSuccess }: IndividualSignUpFormProps) => {
  const fetcher = useFetcher<typeof action>();
  const user = useOptionalUser();
  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  useEffect(() => {
    if (user) {
      onSignUpSuccess?.();
    }
  }, [onSignUpSuccess, user]);

  return (
    <div>
      <fetcher.Form method="post" action="/join" role="form">
        <UiInput
          label="Nombre"
          labelOnTop
          name="name"
          error={fetcher.data?.errors?.name || undefined}
          category={fetcher.data?.errors?.name ? 'error' : undefined}
        />
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
        <UiInput
          label="Telefono"
          labelOnTop
          name="phone"
          error={fetcher.data?.errors?.phone || undefined}
          category={fetcher.data?.errors?.phone ? 'error' : undefined}
        />
        <UiSpacing margin={submitButtonMargin}>
          <UiButton type="submit" fullWidth disabled={fetcher.state !== 'idle'}>
            <UiSpacing padding={submitButtonPadding}>
              Crear cuenta {fetcher.state !== 'idle' && <UiIcon icon='LoadingSpinner' />}
            </UiSpacing>
          </UiButton>
        </UiSpacing>
        {onBackClick && (
          <UiButton category="negative" fullWidth type="button" onClick={handleBackClick} styling='clear'>
            <UiSpacing padding={submitButtonPadding}>
              Regresar
            </UiSpacing>
          </UiButton>
        )}
      </fetcher.Form>
    </div>
  );
};
