import React from 'react';

import Confirm from '../../../app/routes/confirm';
import { render } from '../../utils/render';

describe('<Confirm />', () => {
  it('Should render fine', () => {
    render(<Confirm />);

    cy.findByText('3. Confirma tu correo').should('be.visible');
    cy.findByRole('heading', { name: 'Listo!' }).should('be.visible');
    cy.findByText('Tu cuenta se a creado con exito, revisa tu correo te hemos enviado un correo para verificar tu correo.').should('be.visible');
    cy.findByRole('img', { name: 'revisa tu correo' }).should('be.visible');
    cy.findByRole('link', { name: 'Ir al dashboard' }).should('be.visible');
    cy.findByRole('heading', { name: 'Unos tips de seguridad' }).should('be.visible');
    cy.findByText('Nunca dejes tu cuenta abierta en computadoras publicas').should('be.visible');
    cy.findByText('Revisa siempre que el dominio sea:').should('be.visible');
    cy.findByText('Nosotros NUNCA te pediremos tu contraseña por correo, mensaje o llamada').should('be.visible');
    cy.findByText('Nunca escribas tus contraseñas en papeles!!').should('be.visible');
  });

  it('Dashboard link should redirect to houses', () => {
    render(<Confirm />, [
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        action: () => { },
        loader: () => { return { ok: true } },
        element: <>Houses</>,
        path: 'houses/'
      }
    ]);

    cy.findByRole('link', { name: 'Ir al dashboard' }).click();
    cy.findByText('Houses').should('be.visible');
  });

  it('Should render email when user session is found', () => {
    render(<Confirm />, undefined, {
      loader: () => { return { user: { email: 'some@email.com', userId: 'xxxx' } } },
      id: 'root',
      path: '/'
    });

    cy.findByText('Revisa el correo:').should('be.visible');
    cy.findByText('some@email.com').should('be.visible');
  });
});