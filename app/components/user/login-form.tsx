import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useCallback } from "react";

import styled from 'styled-components';

import { UiButton } from "@uireact/button";
import { UiInput } from '@uireact/form';
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing } from "@uireact/foundation";

import type { action } from '../../routes/login';

const submitButtonMargin: UiSpacingProps['margin'] = {block: 'four'};

export type LoginFormProps = {
  onBackClick?: () => void;
}

const FormDiv = styled.div`
  width: 300px;
`

export const LoginForm: React.FC<LoginFormProps> = ({ onBackClick }: LoginFormProps) => {
  const data = useActionData<typeof action>();
  const handleBackClick = useCallback(() => {
    onBackClick?.();
  }, [onBackClick]);

  console.log(data);

  return (
    <FormDiv>
      <Form method="post" action="/login">
        <UiInput label="Correo electronico" labelOnTop type="email" name="email" error={data?.errors.email || undefined} theme={data?.errors.email ? 'error' : undefined} />
        <UiInput label="Contraseña" labelOnTop type="password" name="password" error={data?.errors.password || undefined} theme={data?.errors.password ? 'error' : undefined} />
        <input type="hidden" name="redirectTo" value={'/houses'} />
        <UiSpacing margin={submitButtonMargin}>
          <UiButton type="submit" fullWidth>Iniciar sesion</UiButton>
        </UiSpacing>
        {onBackClick && <UiButton theme="negative" fullWidth type="button" onClick={handleBackClick}>Regresar</UiButton>}
        </Form>
    </FormDiv>
  );
}
