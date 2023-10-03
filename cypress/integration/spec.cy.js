// cypress/integration/app.spec.js (or .ts)

describe("App", () => {
  beforeEach(() => {
    // Visit the application URL before each test.
    cy.visit("http://localhost:3000/");
  });

  it("loads the app correctly", () => {
    // Check if the title exists and contains the text "Foodie Delight".
    cy.get("h1 a").should("exist").should("contain", "Foodie Delight");

    // Check if the Navbar component is present.
    cy.get("nav").should("exist");

    // Check if the loading message appears initially.
    cy.get("p").should("exist").should("contain", "Loading...");

    // Wait for the loading to finish and check if the ThreeRandomDishes component appears.
    cy.get("p").should("not.exist");
    cy.get(".ThreeRandomDishes").should("exist");
  });

  it("navigates to the random-dish page", () => {
    // Click on the "Random Dish" link.
    cy.contains("Random Dish").click();

    // Check if the URL has changed to the random-dish page.
    cy.url().should("include", "/random-dish");

    // Check if the RandomDish component is present.
    cy.get(".RandomDish").should("exist");
  });

  // Add more tests for other routes as needed.
});
