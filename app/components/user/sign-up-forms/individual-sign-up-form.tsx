import React from 'react';

import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect } from "react";

import styled from 'styled-components';

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

const FormDiv = styled.div`
  width: 100%;
`;

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
    <FormDiv>
      <fetcher.Form method="post" action="/join" role="form">
        <UiInput
          label="Nombre"
          labelOnTop
          name="name"
          error={fetcher.data?.errors?.name || undefined}
          theme={fetcher.data?.errors?.name ? 'error' : undefined}
        />
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
        <UiInput
          label="Telefono"
          labelOnTop
          name="phone"
          error={fetcher.data?.errors?.phone || undefined}
          theme={fetcher.data?.errors?.phone ? 'error' : undefined}
        />
        <input type="hidden" name="redirectTo" value={'/houses'} />
        <UiSpacing margin={submitButtonMargin}>
          <UiButton type="submit" fullWidth disabled={fetcher.state !== 'idle'}>
            <UiSpacing padding={submitButtonPadding}>
              Crear cuenta {fetcher.state !== 'idle' && <UiIcon icon='LoadingSpinner' />}
            </UiSpacing>
          </UiButton>
        </UiSpacing>
        {onBackClick && (
          <UiButton theme="negative" fullWidth type="button" onClick={handleBackClick} cristal>
            <UiSpacing padding={submitButtonPadding}>
              Regresar
            </UiSpacing>
          </UiButton>
        )}
      </fetcher.Form>
    </FormDiv>
  );
};
