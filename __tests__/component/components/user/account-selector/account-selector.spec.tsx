import React from 'react';

import { AccountSelector } from '../../../../../app/components/user/account-selector';
import { render } from '../../../../utils/render';

describe('AccountSelector', () => {
  it('Should render account types selector', () => {
    render(<AccountSelector />);

    cy.findByText('1. Tipo de cuenta').should('be.visible');
    cy.findByRole('heading', { name: 'Paso 1. Elige tu tipo de cuenta' }).should('be.visible');
    cy.findByRole('link', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).should('be.visible');
    cy.findByRole('link', { name: 'Inmobiliaria Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.' }).should('be.visible');
  });

  // TODO: Follow up different forms depending on account type
  it('Should render sign up form after selecting an account type', () => {
    render(<AccountSelector />, [
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        action: () => { },
        Component: () => <p>Sign up form</p>,
        loader: () => { return { ok: true } },
        path: 'individual/'
      }
    ]);

    cy.findByRole('link', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).click();

    cy.findByText('Sign up form').should('be.visible');
  });
});