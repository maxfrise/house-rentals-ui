import { faker } from "@faker-js/faker";

describe("User tests", () => {
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

    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible');

    cy.findByRole("button", { name: /Cerrar sesion/i }).click();
    cy.findByRole("button", { name: /Iniciar Sesion/i });
  });
});
