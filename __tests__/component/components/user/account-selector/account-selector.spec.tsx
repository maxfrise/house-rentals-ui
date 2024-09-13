import React from 'react';

import { AccountSelector } from '../../../../../app/components/user/account-selector';
import { render } from '../../../../utils/render';

describe('AccountSelector', () => {
  it('Should render account types selector', () => {
    render(<AccountSelector />);

    cy.findByText('1. Tipo de cuenta').should('be.visible');
    cy.findByRole('heading', { name: 'Paso 1. Elige tu tipo de cuenta' }).should('be.visible');
    cy.findByRole('link', { name: 'Propietario Cuenta para propietarios que necesitan administrar sus rentas.' }).should('be.visible');
    cy.findByRole('link', { name: 'Inmobiliaria Cuenta empresarial para inmobiliarias.' }).should('be.visible');
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

    cy.findByRole('link', { name: 'Propietario Cuenta para propietarios que necesitan administrar sus rentas.' }).click();

    cy.findByText('Sign up form').should('be.visible');
  });
});