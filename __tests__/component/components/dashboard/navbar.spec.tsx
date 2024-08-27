import React from 'react';

import { Navbar } from '../../../../app/components/dashboard';
import { render } from '../../../utils/render';
import type { House } from '../../../../app/types';

describe('<Navbar />', () => {
  it('Should render fine', () => {
    cy.viewport('macbook-15');
    render(<Navbar />);

    cy.findByRole('link', { name: 'Inicio' }).should('be.visible').and('have.attr', 'href').and('include', '/houses');
    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible').and('have.attr', 'href').and('include', '/new');
  });

  it('Should render fine when houses are provided', () => {
    cy.viewport('macbook-15');
    const houses: House[] = [
      {
        houseFriendlyName: 'my house',
        houseId: 'some-house-id',
        landlord: 'Name 1',
        leaseStatus: 'AVAILABLE'
      },
      {
        houseFriendlyName: 'my house 2',
        houseId: 'some-other-house-id',
        landlord: 'Name 2',
        leaseStatus: 'RENTED'
      }
    ];

    render(<Navbar houses={houses}/>);

    cy.findByRole('link', { name: 'Inicio' }).should('be.visible');
    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible');
    cy.findByRole('link', { name: 'my house Disponible' }).should('be.visible');
    cy.findByRole('link', { name: 'my house 2 Rentada' }).should('be.visible');

    cy.findByRole('link', { name: 'my house Disponible' }).should('have.attr', 'href').and('include', houses[0].houseId);
  });

  it('Should ONLY render houses if viewport is small', () => {
    cy.viewport('iphone-6');
    const houses: House[] = [
      {
        houseFriendlyName: 'my house',
        houseId: 'some-house-id',
        landlord: 'Name 1',
        leaseStatus: 'AVAILABLE'
      },
      {
        houseFriendlyName: 'my house 2',
        houseId: 'some-other-house-id',
        landlord: 'Name 2',
        leaseStatus: 'RENTED'
      }
    ];

    render(<Navbar houses={houses} />);

    cy.findByRole('link', { name: 'Inicio' }).should('not.exist');
    cy.findByRole('link', { name: 'Agregar casa' }).should('not.exist');
    cy.findByRole('link', { name: 'my house Disponible' }).should('be.visible');
    cy.findByRole('link', { name: 'my house 2 Rentada' }).should('be.visible');
  });
});