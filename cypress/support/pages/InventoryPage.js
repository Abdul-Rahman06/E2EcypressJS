import BasePage from './common.js';

class InventoryPage extends BasePage {
  constructor() {
    super();
    this.url = '/inventory.html';
    
    // Page elements
    this.selectors = {
      // Header
      header: '.header_secondary_container',
      title: '.title',
      menuButton: '#react-burger-menu-btn',
      menuList: '.bm-menu-list',
      closeMenuButton: '#react-burger-cross-btn',
      
      // Product elements
      productContainer: '.inventory_list',
      productItem: '.inventory_item',
      productName: '.inventory_item_name',
      productPrice: '.inventory_item_price',
      productDescription: '.inventory_item_desc',
      productImage: '.inventory_item_img',
      
      // Buttons
      addToCartButton: '[data-test^="add-to-cart"]',
      removeButton: '[data-test^="remove"]',
      
      // Cart
      cartBadge: '.shopping_cart_badge',
      cartLink: '.shopping_cart_link',
      
      // Sort dropdown
      sortDropdown: '[data-test="product_sort_container"]',
      
      // Product details
      productDetails: '.inventory_details'
    };
  }

  // Navigate to inventory page
  navigateToInventory() {
    this.visit(this.url);
    return this;
  }

  // Add product to cart by name
  addProductToCart(productName) {
    cy.get(this.selectors.productItem).each(($item) => {
      const name = $item.find(this.selectors.productName).text();
      if (name === productName) {
        cy.wrap($item).find(this.selectors.addToCartButton).click();
      }
    });
    return this;
  }

  // Add first product to cart
  addFirstProductToCart() {
    cy.get(this.selectors.addToCartButton).first().click();
    return this;
  }

  // Add multiple products to cart
  addMultipleProductsToCart(count = 3) {
    for (let i = 0; i < count; i++) {
      cy.get(this.selectors.addToCartButton).eq(i).click();
    }
    return this;
  }

  // Remove product from cart by name
  removeProductFromCart(productName) {
    cy.get(this.selectors.productItem).each(($item) => {
      const name = $item.find(this.selectors.productName).text();
      if (name === productName) {
        cy.wrap($item).find(this.selectors.removeButton).click();
      }
    });
    return this;
  }

  // Click on product to view details
  clickProduct(productName) {
    cy.get(this.selectors.productItem).each(($item) => {
      const name = $item.find(this.selectors.productName).text();
      if (name === productName) {
        cy.wrap($item).find(this.selectors.productName).click();
      }
    });
    return this;
  }

  // Open cart
  openCart() {
    this.click(this.selectors.cartLink);
    return this;
  }

  // Open menu
  openMenu() {
    this.click(this.selectors.menuButton);
    return this;
  }

  // Close menu
  closeMenu() {
    this.click(this.selectors.closeMenuButton);
    return this;
  }

  // Sort products
  sortProducts(option) {
    cy.get(this.selectors.sortDropdown).select(option);
    return this;
  }

  // Get cart count
  getCartCount() {
    return cy.get(this.selectors.cartBadge).invoke('text');
  }

  // Verify inventory page is displayed
  assertInventoryPageDisplayed() {
    this.assertIsVisible(this.selectors.header);
    this.assertIsVisible(this.selectors.productContainer);
    this.assertUrlContains('/inventory.html');
    return this;
  }

  // Verify product is added to cart
  assertProductAddedToCart(productName) {
    cy.get(this.selectors.productItem).each(($item) => {
      const name = $item.find(this.selectors.productName).text();
      if (name === productName) {
        cy.wrap($item).find(this.selectors.removeButton).should('be.visible');
      }
    });
    return this;
  }

  // Verify product is removed from cart
  assertProductRemovedFromCart(productName) {
    cy.get(this.selectors.productItem).each(($item) => {
      const name = $item.find(this.selectors.productName).text();
      if (name === productName) {
        cy.wrap($item).find(this.selectors.addToCartButton).should('be.visible');
      }
    });
    return this;
  }

  // Verify cart count
  assertCartCount(expectedCount) {
    cy.get(this.selectors.cartBadge).should('have.text', expectedCount.toString());
    return this;
  }

  // Verify products are sorted by price (low to high)
  assertProductsSortedByPriceLowToHigh() {
    cy.get(this.selectors.productPrice).then(($prices) => {
      const prices = Array.from($prices).map(el => parseFloat(el.textContent.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
    return this;
  }

  // Verify products are sorted by price (high to low)
  assertProductsSortedByPriceHighToLow() {
    cy.get(this.selectors.productPrice).then(($prices) => {
      const prices = Array.from($prices).map(el => parseFloat(el.textContent.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
    return this;
  }

  // Verify products are sorted by name (A to Z)
  assertProductsSortedByNameAToZ() {
    cy.get(this.selectors.productName).then(($names) => {
      const names = Array.from($names).map(el => el.textContent);
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
    return this;
  }

  // Verify products are sorted by name (Z to A)
  assertProductsSortedByNameZToA() {
    cy.get(this.selectors.productName).then(($names) => {
      const names = Array.from($names).map(el => el.textContent);
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
    return this;
  }

  // Get all product names
  getAllProductNames() {
    return cy.get(this.selectors.productName).then(($names) => {
      return Array.from($names).map(el => el.textContent);
    });
  }

  // Get all product prices
  getAllProductPrices() {
    return cy.get(this.selectors.productPrice).then(($prices) => {
      return Array.from($prices).map(el => parseFloat(el.textContent.replace('$', '')));
    });
  }

  // Verify product count
  assertProductCount(expectedCount) {
    cy.get(this.selectors.productItem).should('have.length', expectedCount);
    return this;
  }
}

export default InventoryPage; 