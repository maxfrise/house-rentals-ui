import React from "react";

import { useDialog } from "@uireact/dialog";
import { UiButton } from "@uireact/button";

import { SignUpDialog } from "../../../app/components/user/";
import { render } from '../../../cypress/support/render';

const MockedComponent: React.FC = () => {
  const { actions } = useDialog('sign-up-dialog');

  return (
    <>
      <UiButton onClick={() => actions.openDialog()}>Open</UiButton>
      <SignUpDialog />
    </>
  )
}

describe("<LoginDialog />", () => {
  it("Should render Sign up dialog", () => {
    render(<MockedComponent />);

    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Open' }).click();
    cy.findByRole('dialog').should('be.visible');
    cy.findByRole('heading', { name: 'Registrate' }).should('be.visible');
  });
});
