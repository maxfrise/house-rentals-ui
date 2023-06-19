import React from 'react';

import { AccountTypeSelector } from '../../../../app/components/user/account-type-selector';
import { render } from '../../../utils/render';

describe('AccountTypeSelector', () => {
  it('Should render account types selector', () => {
    render(<AccountTypeSelector />);

    cy.findByRole('button', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).should('be.visible');
    cy.findByRole('button', { name: 'Inmobiliaria Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.' }).should('be.visible');
  });

  // TODO: Follow up different forms depending on account type
  it('Should render sign up form after selecting an account type', () => {
    render(<AccountTypeSelector />);

    cy.findByRole('button', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).click();

    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
  });
});