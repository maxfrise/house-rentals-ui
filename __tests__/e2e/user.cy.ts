import { faker } from "@faker-js/faker";

describe.skip("User tests", () => {
  it("should allow you to register", () => {

    const loginForm = {
      userName: faker.animal.dog(),
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(15, false, /[A-Za-z0-9!@#$%^&*()]/),
      name: faker.name.fullName(),
      phone: '1234567890'
    };

    cy.visitAndCheck("/");

    cy.findByTestId('UiHeader').should('be.visible');

    cy.findByRole("button", { name: /Registrate/i }).click().wait(2000);

    cy.origin(
      'https://maxfrise.auth.us-west-2.amazoncognito.com/signup',
      { args: loginForm },
      (loginForm) => {
        cy.get('input[name="username"]').filter(':visible').type(loginForm.userName.replace(/\s+/g, '_'));
        cy.get('input[name="requiredAttributes[name]"]').filter(':visible').type(loginForm.name);
        cy.get('input[name="requiredAttributes[email]"]').filter(':visible').type(loginForm.email);
        cy.get('input[name="password"]').should('be.visible').filter(':visible').type(`${loginForm.password}_9`);
        cy.get('button[type="submit"]').should('be.enabled').filter(':visible').click();
      }
    );
  });
});
