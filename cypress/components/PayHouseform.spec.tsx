import React from "react";
import PayHouseform from "../../app/components/forms/PayHouseForm";
import type { FormState } from "../../app/routes/houses.$houseId.pay.$jobid";
import type { MaxfriseErrors } from "../../app/components/forms/validator/form-validator-yup";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

describe("PayHouseform", () => {
  const formState: FormState = {
    method: "",
    details: "",
    amount: "5000",
    pk: "123",
    st: "2345",
  };
  const errors: MaxfriseErrors<FormState> = {
    method: "",
    details: "",
    amount: "",
    pk: "",
    st: "",
  };

  it("renders the form", () => {
    const onFormFieldChangeStub = cy.stub().as("onFieldChange");
    const onFormSubmitStub = cy.stub().as("onFormSubmit");
    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route
          path="login"
          element={
            <PayHouseform
              formState={formState}
              errors={errors}
              onFormFieldChange={onFormFieldChangeStub}
              onFormSubmit={onFormSubmitStub}
            />
          }
        />
      ),
      {
        basename: "/",
        initialEntries: ["/login"],
      }
    );

    cy.mount(<RouterProvider router={router} />);
    cy.get('input[name="method"]').type("sergio");
    cy.get('textarea[name="details"]').type("details");
    cy.get('input[name="amount"]').should("have.value", 5000);
    cy.get("button[type=submit]").click();
    cy.get("@onFormSubmit").should("have.been.calledOnce");
    cy.get("@onFieldChange").should("have.callCount", 13);
  });

  it("renders error messages", () => {
    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route
          path="login"
          element={
            <PayHouseform
              formState={formState}
              errors={{
                ...errors,
                details: "there are some detail errors",
                method: "there was an error on the method",
              }}
              onFormFieldChange={() => undefined}
              onFormSubmit={() => undefined}
            />
          }
        />
      ),
      {
        basename: "/",
        initialEntries: ["/login"],
      }
    );

    cy.mount(<RouterProvider router={router} />);

    cy.contains("there was an error on the method").should("be.visible");
    cy.contains("there are some detail errors").should("be.visible");
  });
});
