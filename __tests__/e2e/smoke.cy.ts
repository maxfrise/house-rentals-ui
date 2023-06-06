import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByTestId('UiHeader').should('be.visible');

    cy.findByRole("button", { name: /Registrate/i }).click();

    cy.findByRole("textbox", { name: /Correo electronico/i }).type(loginForm.email);
    cy.findByLabelText(/Contraseña/i).type(loginForm.password);
    cy.findByRole("button", { name: /Crear cuenta/i }).click();

    cy.findByRole('link', { name: '+ Nueva Casa' }).should('be.visible');

    cy.findByRole("button", { name: /Cerrar sesion/i }).click();
    cy.findByRole("button", { name: /Iniciar Sesion/i });
  });

  it("should allow you to create a house", () => {
    const testHouse = {
      houseFriendlyName: faker.animal.rabbit(),
      description: faker.lorem.sentences(2),
      landlordName: faker.name.firstName(),
      landlordPhone: faker.phone.number("312#######"),
      address: faker.address.streetAddress(),
      tenantName: faker.name.firstName(),
      tenantPhone: faker.phone.number("312#######"),
    };

    cy.login();
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /casas/i }).click();

    cy.findByTestId('UiHeader').should('be.visible');

    cy.findByText("todavia no hay casas");

    cy.findByRole("link", { name: /\+ Nueva casa/i }).click();

    cy.findByRole("textbox", { name: /Nombre de la propiedad/i }).type(
      testHouse.houseFriendlyName
    );
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

    cy.location("pathname")
      .should("match", /\/houses\/[a-zA-Z0-9]+\d+/);
  });

  it("should display errors on invalid form submission", () => {
    const testHouse = {
      houseFriendlyName: faker.lorem.words(10),
      description: faker.lorem.sentences(20),
      landlordName: faker.lorem.words(10),
      landlordPhone: faker.phone.number("312########"),
      address: faker.lorem.words(10),
      tenantName: faker.lorem.words(10),
      tenantPhone: faker.phone.number("312########"),
    };

    cy.login();
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /casas/i }).click();
    cy.findByText("todavia no hay casas");

    cy.findByRole("link", { name: /\+ Nueva casa/i }).click();

    cy.findByRole("textbox", { name: /Nombre de la propiedad/i }).type(
      testHouse.houseFriendlyName
    );
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

    cy.findByTestId('UiHeader').should('be.visible');

    cy.get("#houseFriendlyName-error").contains(
      "El campo tiene que tener maximo 40 caracteres"
    );
    cy.get("#details-error").contains(
      "El campo tiene que tener maximo 500 caracteres"
    );
    cy.get("#landlordName-error").contains(
      "El campo tiene que tener maximo 40 caracteres"
    );
    cy.get("#landlordPhone-error").contains(
      "El telefono tiene que ser de 10 digitos"
    );
    cy.get("#address-error").contains(
      "El campo tiene que tener maximo 40 caracteres"
    );
    cy.get("#tenantName-error").contains(
      "El campo tiene que tener maximo 40 caracteres"
    );
    cy.get("#tenantPhone-error").contains(
      "El telefono tiene que ser de 10 digitos"
    );
  });
});
