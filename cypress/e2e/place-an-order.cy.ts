import * as cypress from 'cypress';

describe('Order placed correctly', function() {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'api/auth/user',
      { fixture: 'user.json' }
    );

    cy.intercept(
      'POST',
      'api/auth/token',
      { fixture: 'token.json' }
    )

    cy.intercept(
      'POST',
      'api/orders',
      { fixture: 'order.json' }
    ).as('postOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  })

  before(function() {
    cy.visit('http://localhost:3000');
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
    cy.get('[class^="BurgerConstructor_submitButton"] button').click();
  })

  it('The order number should be 123', function() {
    cy.contains('123');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  })
});

export {};
