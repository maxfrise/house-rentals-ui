import React from 'react';

import { Logo } from '../../../../app/components/branding';
import { render } from '../../../utils/render';

describe('<Logo />', () => {
  it('Should render logo', () => {
    render(<Logo />);

    cy.findByRole('link', { name: 'Maxfrise, Regresar al inicio link' }).should('be.visible');
  });
});
