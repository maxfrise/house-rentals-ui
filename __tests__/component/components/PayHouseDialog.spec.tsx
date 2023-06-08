import React from "react";

import { useDialog } from "@uireact/dialog";
import { UiButton } from "@uireact/button";

import { PayHouseDialog } from "../../../app/components/payHouseDialog";
import { render } from '../../utils/render';

const MockedComponent: React.FC = () => {
  const { actions } = useDialog('pay-house-dialog');

  return (
    <>
      <UiButton onClick={() => actions.openDialog()}>Open</UiButton>
      <PayHouseDialog payment={{
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
      }} />
    </>
  )
}

describe("<PayHouseDialog />", () => {
  it("should render pay house dialog", () => {
    render(<MockedComponent />);

    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Open' }).click();
    cy.findByRole('dialog').should('be.visible');
    cy.findByRole('heading', { name: 'Pago mensual' }).should('be.visible');
  });
});
