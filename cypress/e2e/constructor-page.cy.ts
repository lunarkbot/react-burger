import * as cypress from 'cypress';

describe('Order placed correctly', function() {


  before(function() {
    cy.intercept(
      'GET',
      'api/auth/user',
      { fixture: 'user.json' }
    ).as('authUser');

    cy.intercept(
      'POST',
      'api/auth/token',
      { fixture: 'token.json' }
    ).as('getToken');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.intercept('api/ingredients').as('ingredients');

    cy.visit('http://localhost:3000');
    cy.wait(['@ingredients', '@authUser', '@getToken']);
  });

  it('Open constructor page', function() {
    cy.contains('Соберите бургер');
  });

  it('Drag and drop ingredients to the constructor', function() {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').trigger("dragstart");
    cy.get('[data-testid="dropTarget"]').trigger("drop");

    cy.get('[data-testid="60d3b41abdacab0026a733c8"]').trigger("dragstart");
    cy.get('[data-testid="dropTarget"]').trigger("drop");
  });

  it('Place an order', function () {
    cy.intercept(
      'POST',
      'api/orders',
      { fixture: 'order.json' }
    ).as('postOrder');
    cy.get('[class^="BurgerConstructor_submitButton"] button').click();
    cy.wait('@postOrder');
  })

  it('The order number should be 123', function() {
    cy.contains('123');
  });

  after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  })
});

describe('Ingredient details are displayed correctly', function() {
  before(function() {
    cy.intercept('api/ingredients').as('ingredients');

    cy.visit('http://localhost:3000');
    cy.wait('@ingredients');
  });

  it('Open constructor page', function() {
    cy.contains('Соберите бургер');
  });

  it('Show ingredient details', function () {
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').click();
    cy.contains('Детали ингредиента');
  });
})

export {};
