import React from 'react';

import { SignUpProgressIndicator } from '../../../../app/components/user/sign-up-progress-indicator';
import { render } from '../../../utils/render';

describe('<SignUpProgressIndicator />', () => {
  it(' Should render fine', () => {
    render(<SignUpProgressIndicator current={1} />);

    cy.findByRole('link').should('not.exist');
    cy.findByText('1. Tipo de cuenta').should('be.visible');
    cy.findByText('2. Informacion de la cuenta').should('be.visible');
    cy.findByText('3. Confirma tu correo').should('be.visible');
  });

  it(' Should render step 1 as link so user can go back', () => {
    render(<SignUpProgressIndicator current={2} />);

    cy.findByRole('link', { name: '1. Tipo de cuenta: Individual' }).should('be.visible');
  });

  it(' Should render step 1 as link so user can go back when is agency', () => {
    render(<SignUpProgressIndicator current={2} isAgency/>);

    cy.findByRole('link', { name: '1. Tipo de cuenta: Inmobiliaria' }).should('be.visible');
  });

  it(' Should NOT render link in step 3 as account is already created', () => {
    render(<SignUpProgressIndicator current={3} />);

    cy.findByRole('link').should('not.exist');
    cy.findByText('1. Tipo de cuenta').should('be.visible');
  });
});
