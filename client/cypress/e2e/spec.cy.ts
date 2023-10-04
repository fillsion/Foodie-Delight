describe('Navbar Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should navigate to Random Recipe page when "Random Recipe" link is clicked', () => {
    cy.get('.randomRecipe').click();
  });

  it('should navigate to My Favorites page when "My Favorites" link is clicked', () => {
    cy.get('.favoriteRecipe').click();
  });

  it('should perform a search when "Search" button is clicked with a valid input', () => {
    const searchText = 'Cinammon';
    cy.get('.input-search').type(searchText);
    cy.get('.search-button').click();
  });

  it('should not perform a search when "Search" button is clicked with an empty input', () => {
    cy.get('.search-button').click();
  });
});
