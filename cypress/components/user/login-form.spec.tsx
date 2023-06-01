import React from "react";

import { LoginForm } from "../../../app/components/user/";
import { render } from '../../../cypress/support/render';

describe("<LoginForm />", () => {
  it("Should render LoginForm", () => {
    render(<LoginForm />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('button', { name: 'Iniciar sesion' }).should('be.visible');
  });

  it("Should render back button if onBackClick is provided", () => {
    const mockedFn = cy.stub().as('backClickSpy');
    render(<LoginForm onBackClick={mockedFn} />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('button', { name: 'Iniciar sesion' }).should('be.visible');

    cy.findByRole('button', { name: 'Regresar' }).as('backBtn').should('be.visible');
    
    cy.get('@backBtn').click();

    cy.get('@backClickSpy').should('have.been.calledOnce');
  });

  it("Should redirect to Houses when login is correct", () => {
    render(<LoginForm />, [
      {
        path: '/login',
        action: async () => {
          return {
            errors: null,
            userId: 'xxxxx'
          }
        },
        loader: async () => { return { ok: true } },
        element: <p>Login route</p>
      },
      {
        path: '/houses',
        action: async () => { return { ok: true } },
        loader: async () => { return { ok: true } },
        element: <p>Houses route</p>
      }
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('button', { name: 'Iniciar sesion' }).click();

    cy.findByText('Houses route').should('be.visible');
  });

  it("Should show error message when login is NOT correct", () => {
    render(<LoginForm />, [
      {
        path: '/login',
        action: async () => {
          return { errors: { email: "Email o password invalido", password: null }, userId: null }
        },
        loader: async () => { return { ok: true } },
        element: <p>Login route</p>
      },
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('button', { name: 'Iniciar sesion' }).click();

    cy.findByText('Email o password invalido').should('be.visible');
  });

});
