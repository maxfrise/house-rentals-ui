import React from "react";

import { useDialog } from "@uireact/dialog";
import { UiButton } from "@uireact/button";

import { LoginDialog } from "../../../app/components/user/";
import { render } from '../../../cypress/support/render';


const MockedComponent: React.FC = () => { 
  const { actions } = useDialog('login-dialog');
  
  return (
    <>
      <UiButton onClick={() => actions.openDialog()}>Open</UiButton>
      <LoginDialog />
    </>
  )
}

describe("<LoginDialog />", () => {
  it("Should render LoginDialog", () => {
    render(<MockedComponent />);

    cy.findByRole('dialog').should('not.exist');
    cy.findByRole('button', { name: 'Open' }).click();
    cy.findByRole('dialog').should('be.visible');
  });
});
