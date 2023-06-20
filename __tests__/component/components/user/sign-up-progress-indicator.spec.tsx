import React from 'react';

import { SignUpProgressIndicator } from '../../../../app/components/user/sign-up-progress-indicator';
import { render } from '../../../utils/render';

describe('<SignUpProgressIndicator />', () => {
  it(' Should render fine', () => {
    render(<SignUpProgressIndicator currentIndex={1} />);

    cy.findByText('1. Tipo de cuenta').should('be.visible');
    cy.findByText('2. Informacion de la cuenta').should('be.visible');
    cy.findByText('3. Confirma tu correo').should('be.visible');
  });

  it(' Should render fine when index is greater than 1', () => {
    render(<SignUpProgressIndicator currentIndex={2} />);

    cy.findByText('1. Tipo de cuenta: Individual').should('be.visible');
  });

  it(' Should render fine when index is greater than 1 and is agency', () => {
    render(<SignUpProgressIndicator currentIndex={2} isAgency/>);

    cy.findByText('1. Tipo de cuenta: Inmobiliaria').should('be.visible');
  });
});
