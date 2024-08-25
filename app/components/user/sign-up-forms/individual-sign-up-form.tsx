import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect } from "react";

import { UiPrimaryButton, UiTertiaryButton } from "@uireact/button";
import { UiInput } from '@uireact/form';
import type { UiSpacingProps } from "@uireact/foundation";
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
          icon={<UiIcon icon="UserCircle" />}
          name="name"
          error={fetcher.data?.errors?.name || undefined}
          category={fetcher.data?.errors?.name ? 'error' : undefined}
        />
        <UiInput
          label="Correo electronico"
          labelOnTop
          icon={<UiIcon icon="Mail" />}
          type="email"
          name="email"
          error={fetcher.data?.errors?.email || undefined}
          category={fetcher.data?.errors?.email ? 'error' : undefined}
        />
        <UiInput
          label="Contraseña"
          labelOnTop
          icon={<UiIcon icon="Password" />}
          type="password"
          name="password"
          error={fetcher.data?.errors?.password || undefined}
          category={fetcher.data?.errors?.password ? 'error' : undefined}
        />
        <UiInput
          label="Telefono"
          labelOnTop
          name="phone"
          icon={<UiIcon icon="CirclePhone" />}
          error={fetcher.data?.errors?.phone || undefined}
          category={fetcher.data?.errors?.phone ? 'error' : undefined}
        />
        <UiPrimaryButton type="submit" fullWidth disabled={fetcher.state !== 'idle'} padding={submitButtonPadding} margin={submitButtonMargin}>
          Crear cuenta {fetcher.state !== 'idle' && <UiIcon icon='LoadingSpinner' />}
        </UiPrimaryButton>
        {onBackClick && (
          <UiTertiaryButton fullWidth type="button" onClick={handleBackClick} padding={submitButtonPadding}>
              Regresar
          </UiTertiaryButton>
        )}
      </fetcher.Form>
    </div>
  );
};
