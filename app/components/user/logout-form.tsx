import React from 'react';
import { Form } from "@remix-run/react";

import { UiButton } from "@uireact/button";

type LogoutFormProps = {
  onLogout?: (e: React.FormEvent) => void;
}

export const LogoutForm: React.FC<LogoutFormProps> = ({ onLogout }: LogoutFormProps) => (
  <Form action="/logout" method="post" onSubmit={onLogout} role="form">
    <UiButton type='submit' fullWidth fullHeight styling='clear'>
      Cerrar sesion
    </UiButton>
  </Form>
);
