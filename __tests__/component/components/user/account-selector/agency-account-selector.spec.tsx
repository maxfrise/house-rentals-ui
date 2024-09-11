import React from 'react';

import { AgencyAccountSelector } from '../../../../../app/components/user/account-selector/agency-account-selector';
import { render } from '../../../../utils/render';

describe('<AgencyAccountSelector />', () => {
  it('Should render fine', () => {
    render(<AgencyAccountSelector />);

    cy.findByRole('heading', { name: 'Inmobiliaria' }).should('be.visible');
    cy.findByText('Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.').should('be.visible');
  });

  it('Should navigate to agency form', () => {
    render(<AgencyAccountSelector />, [{
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      action: () => { },
      element: <p>Agency form</p>,
      loader: () => { return { ok: true } },
      path: 'agency/'
    }]);

    cy.findByRole('link').click();

    cy.findByText('Agency form').should('be.visible');
  });
});
