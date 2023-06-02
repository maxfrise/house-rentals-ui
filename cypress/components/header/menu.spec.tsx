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
});