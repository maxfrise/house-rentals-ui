import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /casas/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  it("should allow you to create a house", () => {
    const testHouse = {
      houseFriendlyName: faker.animal.rabbit(),
      description: faker.lorem.sentences(2),
      landlordName: faker.name.firstName(),
      landlordPhone: faker.phone.number(),
      address: faker.address.streetAddress(),
      tenantName: faker.name.firstName(),
      tenantPhone: faker.phone.number(),
    };

    cy.login();
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /casas/i }).click();
    cy.findByText("todavia no hay casas");

    cy.findByRole("link", { name: /\+ Nueva casa/i }).click();

    cy.findByRole("textbox", { name: /Nombre de la propiedad/i }).type(testHouse.houseFriendlyName);
    cy.findByRole("textbox", { name: /Descripción de la propiedad/i }).type(
      testHouse.description
    );
    cy.findByRole("textbox", { name: /Nombre del arrendador/i }).type(
      testHouse.landlordName
    );
    cy.findByRole("textbox", { name: /Telefono del arrendador/i }).type(
      testHouse.landlordPhone
    );
    cy.findByRole("textbox", { name: /Direccion de la casa/i }).type(
      testHouse.address
    );
    cy.findByRole("textbox", { name: /Nombre del arrendatario/i }).type(
      testHouse.tenantName
    );
    cy.findByRole("textbox", { name: /Telefono del arrendatario/i }).type(
      testHouse.tenantPhone
    );

    cy.findByRole("button", { name: /guardar/i }).click();
  });
});
