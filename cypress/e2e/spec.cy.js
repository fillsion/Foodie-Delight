describe("Foodie Delight App", () => {
  beforeEach(() => {
  it('Visits the Kitchen Sink', () => {
      // Visit the application URL before each test.
      cy.visit("http://localhost:3000/");
  })
});

it('should navigate to the Random Recipe page', () => {
  // Visit the application URL before each test.
  cy.visit("http://localhost:3000/random-dish");
})


it("should navigate to the My Favorites page", () => {
  // Click on the "My Favorites" link
  cy.visit("http://localhost:3000/my-favorites");
  //cy.contains("favorite-dishes").click()


});