import React from "react";

import { Header } from "../../../app/components/header/header";
import { render } from '../../../cypress/support/render';

describe("<Header />", () => {
  it("Should render header", () => {
    render(<Header />);

    cy.findByRole('heading', { name: 'Maxfrise' }).should('be.visible');
  });

  it("Should render button to toggle theme", () => {
    const fn = cy.stub().as('toggleThemeFn');
    render(<Header toggleTheme={fn}/>);

    cy.findByRole('heading', { name: 'Maxfrise' }).should('be.visible');
    cy.findByTestId('Icon').should('be.visible');
    cy.findByRole('button').as('toggleButton').should('be.visible');

    cy.findByRole('button').click();

    cy.get('@toggleThemeFn').should('have.been.calledOnce');
  });
});
