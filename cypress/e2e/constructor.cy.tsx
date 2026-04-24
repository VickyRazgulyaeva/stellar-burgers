describe('Страница конструктора', () => {

  const addIngredient = (ingredientName: string) => {
    cy.contains('li', ingredientName).within(() => {
      cy.contains('button', 'Добавить').click();
    });
  };

  const addBun = () => addIngredient('Краторная булка N-200i');

  const addMain = () => addIngredient('Биокотлета из марсианской Магнолии');

  const openIngredientModal = () => {
    cy.contains('li', 'Краторная булка N-200i').find('a').click();
    cy.contains('h3', 'Детали ингредиента').should('exist');
    cy.location('pathname').should('include', '/ingredients/');
  };
 
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'Bearer test-access-token');
    cy.visit('/', {
      onBeforeLoad(window) {
        window.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((window) => {
      window.localStorage.removeItem('refreshToken');
    });
  });

  it('добавляет булку в конструктор', () => {
    addBun();

    cy.get('[data-cy=burger-constructor]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get('[data-cy=burger-constructor]')
      .contains('Краторная булка N-200i (низ)')
      .should('exist');
  });

  it('добавляет начинку в конструктор', () => {
    addMain();

    cy.get('[data-cy=burger-constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('открывает модальное окно ингредиента', () => {
    openIngredientModal();
    
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('420').should('exist');
  });

  it('закрывает модальное окно ингредиента по крестику', () => {
    openIngredientModal();

    cy.contains('h3', 'Детали ингредиента')
      .parent()
      .find('button svg')
      .click({ force: true });
    cy.location('pathname').should('eq', '/');
  });

  it('открывает модалку заказа и показывает корректный номер', () => {
    addBun();
    addMain();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('h2', /^12345$/).should('exist');
  });

  it('закрывает модалку заказа и очищает конструктор', () => {
    addBun();
    addMain();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('h2', /^12345$/).should('exist');

    cy.get('body').type('{esc}');
    cy.contains('h2', /^12345$/).should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});