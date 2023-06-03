import React from 'react';

import { render } from '../../support/render';

import { LogoutForm } from '../../../app/components/user';

describe('<LogoutForm />', () => {
  it('Should render fine', () => {
    render(<LogoutForm />);

    cy.findByRole('button', { name: 'Cerrar sesion' }).should('be.visible');
  });

  it('Should execute callback on submit', () => {
    const logoutFnMock = cy.stub().as('logoutCB')
    render(<LogoutForm onLogout={logoutFnMock} />, [
      {
        path: '/logout',
        action: () => { return { ok: true } },
        loader: () => { return { ok: true } },
        element: <p>Logout path</p>
      }
    ]);

    cy.findByRole('button', { name: 'Cerrar sesion' }).click();

    cy.get('@logoutCB').should('have.been.calledOnce');
    cy.findByText('Logout path').should('be.visible');
  });
});