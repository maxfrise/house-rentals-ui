import React from 'react';
import { Form } from "@remix-run/react";

import { UiButton } from "@uireact/button";

type LogoutFormProps = {
  onLogout?: (e: React.FormEvent) => void;
}

export const LogoutForm: React.FC<LogoutFormProps> = ({ onLogout }: LogoutFormProps) => (
  <Form action="/logout" method="post" onSubmit={onLogout}>
    <UiButton fullWidth>
      Cerrar sesion
    </UiButton>
  </Form>
);
