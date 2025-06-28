import LoginPage from '../../support/pages/LoginPage.js';
import InventoryPage from '../../support/pages/InventoryPage.js';

describe('Sauce Demo Inventory', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.navigateToLogin();
    loginPage.loginWithStandardUser();
  });

  it('should display inventory page correctly', () => {
    inventoryPage.assertInventoryPageDisplayed();
    inventoryPage.assertProductCount(6);
  });

  it('should add product to cart', () => {
    inventoryPage.addFirstProductToCart();
    inventoryPage.assertCartCount(1);
  });

  it('should add multiple products to cart', () => {
    inventoryPage.addMultipleProductsToCart(3);
    inventoryPage.assertCartCount(3);
  });

  it('should remove product from cart', () => {
    inventoryPage.addFirstProductToCart();
    inventoryPage.assertCartCount(1);
    
    inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('should sort products by price low to high', () => {
    inventoryPage.sortProducts('Price (low to high)');
    inventoryPage.assertProductsSortedByPriceLowToHigh();
  });

  it('should sort products by price high to low', () => {
    inventoryPage.sortProducts('Price (high to low)');
    inventoryPage.assertProductsSortedByPriceHighToLow();
  });

  it('should sort products by name A to Z', () => {
    inventoryPage.sortProducts('Name (A to Z)');
    inventoryPage.assertProductsSortedByNameAToZ();
  });

  it('should sort products by name Z to A', () => {
    inventoryPage.sortProducts('Name (Z to A)');
    inventoryPage.assertProductsSortedByNameZToA();
  });

  it('should open cart from inventory page', () => {
    inventoryPage.openCart();
    cy.url().should('include', '/cart.html');
  });

  it('should open and close menu', () => {
    inventoryPage.openMenu();
    cy.get('.bm-menu-list').should('be.visible');
    
    inventoryPage.closeMenu();
    cy.get('.bm-menu-list').should('not.be.visible');
  });

  it('should display all product information', () => {
    cy.get('.inventory_item').should('have.length', 6);
    
    cy.get('.inventory_item').each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('be.visible');
      cy.wrap($item).find('.inventory_item_price').should('be.visible');
      cy.wrap($item).find('.inventory_item_desc').should('be.visible');
      cy.wrap($item).find('.inventory_item_img').should('be.visible');
      cy.wrap($item).find('[data-test^="add-to-cart"]').should('be.visible');
    });
  });

  it('should click on product to view details', () => {
    inventoryPage.clickProduct('Sauce Labs Backpack');
    cy.url().should('include', '/inventory-item.html');
  });

  it('should verify product prices are displayed correctly', () => {
    inventoryPage.getAllProductPrices().then((prices) => {
      expect(prices).to.have.length(6);
      prices.forEach(price => {
        expect(price).to.be.a('number');
        expect(price).to.be.greaterThan(0);
      });
    });
  });
}); 