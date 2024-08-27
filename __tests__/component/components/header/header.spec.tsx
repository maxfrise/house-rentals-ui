import React from "react";

import { Header } from "../../../../app/components/header/header";
import { render } from '../../../utils/render';

describe("<Header />", () => {
  it("Should render header", () => {;

    render(<Header />);

    cy.findByRole('link', { name: 'Maxfrise, Regresar al inicio link' }).should('be.visible');
  });

  it("Should render menu button", () => {
    cy.viewport('iphone-x');
    render(<Header />);

    cy.findByRole('link', { name: 'Maxfrise, Regresar al inicio link' }).should('be.visible');
    cy.findByTestId('header-menu-toogle').as('menuToggleBtn').should('be.visible');

    cy.get('@menuToggleBtn').click();

    cy.findByRole('menu').should('be.visible');
  });

  it("Should log out session button in desktop and user is signed in", () => {
    cy.viewport('macbook-16');

    render(<Header />, undefined, {
      id: 'root',
      loader: () => { return { user: { email: 'xxxx', userId: 'xxxx' } } },
      path: '/'
    });

    cy.findByRole('button', { name: 'Cerrar sesion' }).should('be.visible');
  });  
});
