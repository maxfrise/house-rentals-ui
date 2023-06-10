import React from 'react';

import { FooterActions } from '../../../../app/components/dashboard/footer-actions';
import { render } from '../../../utils/render';

describe('<FooterActions />', () => { 
  it('Should not render if is large', () => {
    cy.viewport('macbook-11');
    render(<FooterActions />);

    cy.findByTestId('footer-actions').should('not.exist');
  });

  it('Should render if is small', () => {
    cy.viewport('ipad-mini');
    render(<FooterActions />);

    cy.findByTestId('footer-actions').should('be.visible');
  });

  it('Should render actions', () => {
    cy.viewport('ipad-mini');
    render(<FooterActions />);

    cy.findByRole('link', { name: 'Inicio' }).should('be.visible');
    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible');
  });
});