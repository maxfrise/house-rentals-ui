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

  it('should to create a house', () => {
    const testHouse = {
      hosueName: faker.lorem.words(1),
      description: faker.lorem.sentences(2),
    };

    cy.login();
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /casas/i }).click();
    cy.findByText("todavia no hay casas");

    cy.findByRole("link", { name: /\+ Nueva casa/i }).click();

    cy.findByRole("textbox", { name: /Casa/i }).type(testHouse.hosueName);
    cy.findByRole("textbox", { name: /Descripcion/i }).type(testHouse.description);
    cy.findByRole("button", { name: /save/i }).click();
  })
});
