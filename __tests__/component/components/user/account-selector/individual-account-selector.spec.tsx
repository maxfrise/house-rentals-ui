import React from 'react';

import { IndividualAccountSelector } from '../../../../../app/components/user/account-selector/individual-account-selector';
import { render } from '../../../../utils/render';

describe('<IndividualAccountSelector />', () => {
  it('Should render fine', () => {
    render(<IndividualAccountSelector />);

    cy.findByRole('heading', { name: 'Individual' }).should('be.visible');
    cy.findByText('Cuenta para personas individuales que necesitan administrar sus propiedades.').should('be.visible');
  });

  it('Should navigate to individual form', () => {
    render(<IndividualAccountSelector />, [{
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      action: () => { },
      Component: () => <p>Individual form</p>,
      loader: () => { return { ok: true } },
      path: 'individual/'
    }]);

    cy.findByRole('link').click();

    cy.findByText('Individual form').should('be.visible');
  });
});
