import React from "react";

import { redirect } from "@remix-run/server-runtime";

import { IndividualSignUpForm } from "../../../../../app/components/user/sign-up-forms";
import { render } from '../../../../utils/render';
import { delay } from '../../../../utils/delay';

describe("<IndividualSignUpForm />", () => {
  it("Should render IndividualSignUpForm", () => {
    render(<IndividualSignUpForm />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Nombre' }).should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('textbox', { name: 'Telefono' }).should('be.visible');
    cy.findByRole('button', { name: 'Crear cuenta' }).should('be.visible');
  });

  it("Should render back button", () => {
    const mockedFn = cy.stub().as('backFn');
    render(<IndividualSignUpForm onBackClick={mockedFn} />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).should('be.visible');
    cy.findByLabelText('Contraseña').should('be.visible');
    cy.findByRole('button', { name: 'Crear cuenta' }).should('be.visible');
    cy.findByRole('button', { name: 'Regresar' }).as('backBtn').should('be.visible');

    cy.get('@backBtn').click();
    cy.get('@backFn').should('have.been.calledOnce');
  });

  it("Should redirect to Confirm page when sign up is correct", () => {
    render(<IndividualSignUpForm />, [
      {
        path: '/join',
        action: async () => { return redirect('/confirm') },
        loader: async () => { return { ok: true } },
        Component: () => <p>Sign up route</p>
      },
      {
        path: '/confirm',
        action: async () => { return { ok: true } },
        loader: async () => { return { ok: true } },
        Component: () => <p>Confirm email</p>
      }
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Nombre' }).type('Some name');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('textbox', { name: 'Telefono' }).type('3121212312');
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByText('Confirm email').should('be.visible');
  });

  it("Should show error message when sign up is NOT correct", () => {
    render(<IndividualSignUpForm />, [
      {
        path: '/join',
        action: async () => {
          return { errors: { email: "El correo ya existe", password: null }, userId: null }
        },
        loader: async () => { return { ok: true } },
        Component: () => <p>Login route</p>
      },
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByText('El correo ya existe').should('be.visible');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("Should render loading icon when is signin up", () => {
    render(<IndividualSignUpForm />, [
      {
        path: '/join',
        action: async () => {
          await delay(1000);
          return { errors: { email: "El correo ya existe", password: null }, userId: null };
        },
        loader: async () => { return { ok: true } },
        Component: () => <p>Login route</p>
      },
      {
        path: '/confirm',
        action: async () => { return { ok: true } },
        loader: async () => { return { ok: true } },
        Component: () => <p>Confirm email</p>
      }
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Correo electronico' }).type('dev@dev.com');
    cy.findByLabelText('Contraseña').type('123456');
    cy.findByRole('button', { name: 'Crear cuenta' }).click();

    cy.findByTestId('Icon').should('be.visible');
  });
});
