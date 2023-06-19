import React from "react";

import { useDialog } from "@uireact/dialog";
import { UiButton } from "@uireact/button";

import { SignUpDialog } from "../../../../app/components/user";
import { render } from '../../../utils/render';

const MockedComponent: React.FC = () => {
  const { actions } = useDialog('sign-up-dialog');

  return (
    <>
      <UiButton onClick={() => actions.openDialog()}>Open</UiButton>
      <SignUpDialog />
    </>
  )
}

describe("<SignUpDialog />", () => {
  it("Should render Sign up selector inside dialog", () => {
    render(<MockedComponent />);

    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Open' }).click();
    cy.findByRole('dialog').should('be.visible');
    cy.findByRole('heading', { name: 'Registrate' }).should('be.visible');
    cy.findByRole('button', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).should('be.visible');
  });
});
