import React from 'react';

import { HomeButton } from '../../../../../app/components/dashboard/buttons';
import { render } from '../../../../utils/render';

describe('<HomeButton />', () => {
  it('Should render fine', () => {
    render(<HomeButton />);

    cy.findByRole('link', { name: 'Inicio' }).should('be.visible');
  });

  it('Should redirect to /houses path', () => {
    render(<HomeButton />, [
      {
        action: () => { },
        element: <p>Houses home</p>,
        loader: () => { return { ok: true } },
        path: '/houses'
      }
    ],
      {
        id: 'root',
        loader: () => { return { ok: true } },
        path: '/'
      }
    );

    cy.findByRole('link', { name: 'Inicio' }).click();
    cy.findByText('Houses home').should('be.visible');
  });
});