import React from "react";
import { GenericInputField } from "../../app/components/forms/fields/GenericInputField";

describe("GenericInputField.cy.ts", () => {
  it("lets you type a name", () => {
    cy.mount(
      <GenericInputField
        label="Nombre del arrendatario"
        error={null}
        name="tenantName"
      />
    );

    cy.get("label").should("have.text", "Nombre del arrendatario ");
    cy.get("input")
      .type("Sergio Audel")
      .should("have.value", "Sergio Audel")
      .and("have.attr", "name", "tenantName");
  });
});
