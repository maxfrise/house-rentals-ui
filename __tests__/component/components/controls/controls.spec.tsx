import React from 'react';

import { render } from '../../../utils/render';
import { Controls } from '../../../../app/components/controls';

describe('<Controls />', () => {
  it('Should render controls', () => {
    render(<Controls />);

    cy.findByRole('link', { name: 'Casas' }).should('be.visible').should('have.attr', 'href', '/houses');
    cy.findByRole('link', { name: 'Agregar nueva casa' }).should('be.visible').should('have.attr', 'href', '/houses/new')
  });
});
