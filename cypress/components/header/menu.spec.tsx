import React from 'react';

import { HeaderMenu } from '../../../app/components/header/menu';
import { render } from '../../support/render';

describe('<HeaderMenu />', () => {
  it('Should render fine', () => {
    const openLoginDialogMock = cy.stub().as('openLoginDialog');
    const openSignUiDialogMock = cy.stub().as('openSignUiDialog');

    render(<HeaderMenu openLoginDialog={openLoginDialogMock} openSignUiDialog={openSignUiDialogMock} />);
    
    cy.findByText('Iniciar sesion').should('be.visible');
    cy.findByText('Registrate').should('be.visible');
  });

  it('Should render fine when user is identified', () => {
    const openLoginDialogMock = cy.stub().as('openLoginDialog');
    const openSignUiDialogMock = cy.stub().as('openSignUiDialog');

    render(<HeaderMenu openLoginDialog={openLoginDialogMock} openSignUiDialog={openSignUiDialogMock} />, undefined, {
      id: 'root',
      loader: () => { return { user: { email: 'xxxx', userId: 'xxxx' } } },
      path: '/'
    });

    cy.findByRole('form').should('be.visible');
    cy.findByRole('button', { name: 'Cerrar sesion' }).should('be.visible');
  });
});