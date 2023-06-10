import React from 'react';

import { AddHouseButton } from '../../../../../app/components/dashboard/buttons';
import { render } from '../../../../utils/render';

describe('<AddHouseButton />', () => {
  it('Should render fine', () => {
    render(<AddHouseButton />);

    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible');
  });

  it('Should redirect to new/ path', () => {
    render(<AddHouseButton />, [
      {
        action: () => { },
        element: <p>New house path</p>,
        loader: () => { return { ok: true } },
        path: 'new/'
      }
    ]);

    cy.findByRole('link', { name: 'Agregar casa' }).click();
    cy.findByText('New house path').should('be.visible');
  });
});