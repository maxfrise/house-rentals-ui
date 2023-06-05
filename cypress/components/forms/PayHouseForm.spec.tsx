import React from "react";

import PayHouseform from "../../../app/components/forms/PayHouseForm";
import { render } from '../../../cypress/support/render';

describe("<PayHouseform />", () => {
  const paymentMock = {
    landlords: [
      {
        name: "",
        phone: "",
      }
    ],
    status: "",
    tenants: [
      {
        name: "",
        phone: "",
      }
    ],
    details: [{ amount: "1200" }],
    pk: "123",
    st: "432"
  }

  it("should render PayHouseform", () => {
    render(<PayHouseform payment={paymentMock} />);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Metodo' }).should('be.visible');
    cy.findByRole('textbox', { name: 'Detalles' }).should('be.visible');
    cy.findByRole('button', { name: 'Pagar' }).should('be.visible');
  });

  it('should render errors on invalid form submission', () => {
    render(<PayHouseform payment={paymentMock} />, [
      {
        path: '/payjob',
        action: () => { return { errors: { method: "required", details: "required" } } },
        loader: () => { return null },
        element: <></>
      },
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Metodo' })
    cy.findByRole('textbox', { name: 'Detalles' })
    cy.findByRole('button', { name: 'Pagar' }).click();

    cy.findAllByText('required').should("have.length", 2)
  })

  it('should call formSubmitted on form submission', () => {
    const mockFn = cy.stub().as('onPaymentSubmitted');
    render(<PayHouseform payment={paymentMock} onPaymentSubmitted={mockFn} />, [
      {
        path: '/payjob',
        action: () => { return null },
        loader: () => { return null },
        element: <></>
      },
    ]);

    cy.findByRole('form').should('be.visible');
    cy.findByRole('textbox', { name: 'Metodo' }).type('venmo')
    cy.findByRole('textbox', { name: 'Detalles' }).type('just on date')
    cy.findByRole('button', { name: 'Pagar' }).click();
    cy.get('@onPaymentSubmitted').should('have.been.calledOnce');
  })
});
