import React from "react";

import { redirect } from "@remix-run/server-runtime";

import { SignUpForm } from "../../../../app/components/user";
import { render } from '../../../utils/render';
import { delay } from '../../../utils/delay';

describe("<SignUpForm />", () => {
  it("Should render SignUpForm", () => {
    render(<SignUpForm />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('button', { name: 'Crear cuenta' }).should('be.visible');
  });

  it("Should render back button", () => {
    const mockedFn = cy.stub().as('backFn');
    render(<SignUpForm onBackClick={mockedFn} />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('button', { name: 'Crear cuenta' }).should('be.visible');
    cy.findByRole('button', { name: 'Regresar' }).as('backBtn').should('be.visible');

    cy.get('@backBtn').click();
    cy.get('@backFn').should('have.been.calledOnce');
  });

  it("Should redirect to Houses when sign up is correct", () => {
    render(<SignUpForm />, [
      {
        path: '/join',
        action: async () => { return redirect('/houses') },
        loader: async () => { return { ok: true } },
        element: <p>Sign up route</p>
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
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByText('Houses route').should('be.visible');
  });

  it("Should show error message when sign up is NOT correct", () => {
    render(<SignUpForm />, [
      {
        path: '/join',
        action: async () => {
          return { errors: { email: "El correo ya existe", password: null }, userId: null }
        },
        loader: async () => { return { ok: true } },
        element: <p>Login route</p>
      },
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByText('El correo ya existe').should('be.visible');
  });

  it("Should render loading icon when is signin up", () => {
    render(<SignUpForm />, [
      {
        path: '/join',
        action: async () => {
          await delay(1000);
          return { errors: { email: "El correo ya existe", password: null }, userId: null };
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
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByTestId('Icon').should('be.visible');
  });
});
