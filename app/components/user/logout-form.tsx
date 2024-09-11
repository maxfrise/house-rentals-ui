import React from 'react';
import { Form } from "@remix-run/react";

import { UiSecondaryButton } from "@uireact/button";
import { UiText } from '@uireact/text';

type LogoutFormProps = {
  onLogout?: (e: React.FormEvent) => void;
}

export const LogoutForm: React.FC<LogoutFormProps> = ({ onLogout }: LogoutFormProps) => (
  <Form action="/logout" method="post" onSubmit={onLogout} role="form">
    <UiSecondaryButton type='submit' padding={{ inline: 'three', block: 'two'}}>
      <UiText>Cerrar sesion</UiText>
    </UiSecondaryButton>
  </Form>
);
