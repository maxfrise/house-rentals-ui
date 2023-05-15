import React from "react";
import { GenericInputField } from "../../app/components/forms/fields/GenericInputField";

describe("GenericInputField", () => {
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

  it("has an initial value", () => {
    cy.mount(
      <GenericInputField
        label="Nombre del arrendatario"
        error={null}
        name="tenantName"
        initialValue={"Sergio Audel"}
      />
    );

    cy.get("label").should("have.text", "Nombre del arrendatario ");
    cy.get("input")
      .should("have.value", "Sergio Audel")
      .and("have.attr", "name", "tenantName");
  });

  it("renders an error", () => {
    cy.mount(
      <GenericInputField
        label="Nombre del arrendatario"
        name="tenantName"
        error={"invalid field"}
        initialValue={"Sergio Audel"}
      />
    );

    cy.get("div[id=tenantName-error").should("have.text", "invalid field");
  });

  it("triggers a cb on input change", () => {
    const stub = cy.stub().as("callback");
    cy.mount(
      <GenericInputField
        label="Nombre del arrendatario"
        name="tenantName"
        cb={stub}
      />
    );

    cy.get("input").type("Sergio");

    cy.get("@callback").should("have.callCount", 6);
  });
});
