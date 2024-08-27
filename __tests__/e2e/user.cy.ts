import { faker } from "@faker-js/faker";

describe("User tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
      name: 'Some name',
      phone: '1234567890'
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByTestId('UiHeader').should('be.visible');

    cy.findByRole("button", { name: /Registrate/i }).click();
    cy.findByRole('button', { name: 'Individual Cuenta para personas individuales que necesitan administrar sus propiedades.' }).click();

    cy.findByRole("textbox", { name: /Correo electronico/i }).type(loginForm.email);
    cy.findByRole("textbox", { name: /Nombre/i }).type(loginForm.name);
    cy.findByRole("textbox", { name: /Telefono/i }).type(loginForm.phone);
    cy.findByLabelText(/Contraseña/i).type(loginForm.password);
    cy.findByRole("button", { name: /Crear cuenta/i }).click();

    cy.findByRole('heading', { name: 'Listo!' }).should('be.visible');
    cy.findByText('Tu cuenta se a creado con exito, revisa tu correo te hemos enviado un correo para verificar tu correo.').should('be.visible');
    cy.findByRole('link', { name: 'Ir al dashboard' }).should('be.visible').click();

    cy.findByRole('link', { name: 'Agregar casa' }).should('be.visible');
    cy.findByRole("button", { name: /Cerrar sesion/i }).click();
    cy.findByRole("button", { name: /Iniciar Sesion/i });
  });
});
