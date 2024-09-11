import React from 'react';

import { DuePayments } from '../../../../../app/components/dashboard/payments';
import { render } from '../../../../utils/render';
import type { Payment } from '~/api/types';

const duePayments: Payment[] = [
  {
    details: [
      {
        amount: "1000"
      }
    ],
    landlords: [],
    pk: "p#2023-11-30T00:00:00.000Z",
    st: "cljgnalmg000008jqc6tvacg0",
    status: "DUE",
    tenants: []
  }
];

describe('<DuePayments />', () => { 
  it('Should render payments card if is large', () => {
    const onPayClick = cy.stub().as("onPayClick");
    cy.viewport('macbook-11');
    render(<DuePayments payments={duePayments} onPayClick={onPayClick} />);

    cy.findByText('30 Noviembre').should('be.visible');
    cy.findByText('$1,000.00').should('be.visible');
    cy.findByRole('button', { name: 'Pagar' }).should('be.visible');

    cy.findByRole('button').click();

    cy.get("@onPayClick").should('have.been.calledOnce');
    cy.get("@onPayClick").should('have.been.calledWith', duePayments[0]);
  });

  it('Should render payments card if is small', () => {
    const onPayClick = cy.stub().as("onPayClick");
    cy.viewport('iphone-8');
    render(<DuePayments payments={duePayments} onPayClick={onPayClick} />);

    cy.findByText('30 Noviembre').should('be.visible');
    cy.findByText('$1,000.00').should('be.visible');
    cy.findByRole('button', { name: 'Pagar' }).as("payButton").should('be.visible');

    cy.get("@payButton").click({force: true});

    cy.get("@onPayClick").should('have.been.calledOnce');
    cy.get("@onPayClick").should('have.been.calledWith', duePayments[0]);
  });

  describe('When no payments due', () => {
    it('Should render payments card if is small', () => {
      const onPayClick = cy.stub().as("onPayClick");
      cy.viewport('iphone-8');
      render(<DuePayments payments={[]} onPayClick={onPayClick} />);
  
      cy.findByText('No hay pagos activos').should('be.visible');
    });
  });
});