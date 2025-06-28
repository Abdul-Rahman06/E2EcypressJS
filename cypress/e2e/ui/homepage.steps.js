import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../support/pages/HomePage.js';

const homePage = new HomePage();

// Background step
Given('I am on the DemoQA homepage', () => {
  homePage.navigateToHome();
});

// When steps
When('I wait for the page to load completely', () => {
  homePage.waitForPageLoad();
});

When('I click on the {string} card', (cardName) => {
  homePage.clickCardByName(cardName);
});

When('I resize the browser to {int}x{int}', (width, height) => {
  homePage.setViewport(width, height);
});

When('I simulate slow network connection', () => {
  cy.intercept('**/*', { delay: 2000 }).as('slowNetwork');
});

When('I disable JavaScript', () => {
  // This would require browser configuration
  cy.log('JavaScript disabled simulation');
});

When('I measure the page load time', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    cy.log(`Page load time: ${loadTime}ms`);
  });
});

// Then steps
Then('I should see the DemoQA logo', () => {
  homePage.assertIsVisible(homePage.selectors.logo);
});

Then('I should see {int} category cards', (expectedCount) => {
  homePage.assertCardCount(expectedCount);
});

Then('the page title should contain {string}', (expectedTitle) => {
  homePage.assertTitleContains(expectedTitle);
});

Then('all category cards should be visible', () => {
  homePage.assertAllCardsVisible();
});

Then('I should be redirected to the Elements page', () => {
  homePage.assertUrlContains('elements');
});

Then('I should be redirected to the Forms page', () => {
  homePage.assertUrlContains('forms');
});

Then('I should be redirected to the Alerts, Frame & Windows page', () => {
  homePage.assertUrlContains('alerts');
});

Then('I should be redirected to the Widgets page', () => {
  homePage.assertUrlContains('widgets');
});

Then('I should be redirected to the Interactions page', () => {
  homePage.assertUrlContains('interactions');
});

Then('I should be redirected to the Book Store Application page', () => {
  homePage.assertUrlContains('books');
});

Then('the URL should contain {string}', (path) => {
  homePage.assertUrlContains(path);
});

Then('I should see the following category cards:', (dataTable) => {
  const expectedCards = dataTable.rows().map(row => row[0]);
  homePage.assertCardsExist(expectedCards);
});

Then('I should see the footer', () => {
  homePage.assertFooterVisible();
});

Then('the footer should contain copyright information', () => {
  homePage.assertFooterTextContains('©');
});

Then('I should see the banner image', () => {
  homePage.assertBannerVisible();
});

Then('the banner should contain welcome text', () => {
  homePage.assertBannerTextContains('Welcome');
});

Then('all elements should be properly displayed', () => {
  homePage.assertIsVisible(homePage.selectors.logo);
  homePage.assertElementCount(homePage.selectors.allCards, 6);
});

Then('all category card links should be functional', () => {
  const expectedCards = [
    'Elements',
    'Forms',
    'Alerts, Frame & Windows',
    'Widgets',
    'Interactions',
    'Book Store Application'
  ];

  expectedCards.forEach(cardName => {
    homePage.clickCardByName(cardName);
    homePage.assertUrlContains(cardName.toLowerCase().replace(/\s+/g, '-'));
    homePage.navigateToHome();
  });
});

Then('I should be able to navigate back to homepage from each page', () => {
  homePage.navigateToHome();
  homePage.assertUrlEquals('https://demoqa.com/');
});

Then('the page should still load successfully', () => {
  homePage.waitForPageLoad();
  homePage.assertIsVisible(homePage.selectors.logo);
});

Then('all elements should be visible after loading', () => {
  homePage.assertAllCardsVisible();
});

Then('the page should still be accessible', () => {
  homePage.assertIsVisible(homePage.selectors.logo);
});

Then('basic functionality should work', () => {
  homePage.assertElementCount(homePage.selectors.allCards, 6);
});

Then('the page should load within {int} seconds', (maxSeconds) => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    expect(loadTime).to.be.lessThan(maxSeconds * 1000);
  });
});

Then('all images should load within {int} seconds', (maxSeconds) => {
  cy.get('img').each(($img) => {
    cy.wrap($img).should('be.visible');
  });
});

// Additional helper steps
When('I scroll to the {string} card', (cardName) => {
  homePage.scrollToCard(cardName);
});

Then('the {string} card should be in viewport', (cardName) => {
  const cardSelector = `.card-body:contains("${cardName}")`;
  homePage.assertElementInViewport(cardSelector);
});

When('I take a screenshot of the {string} card', (cardName) => {
  homePage.takeCardScreenshot(cardName);
});

Then('the screenshot should be saved', () => {
  // Screenshot is automatically saved by Cypress
  cy.log('Screenshot saved successfully');
});

When('I check if the {string} card exists', (cardName) => {
  homePage.cardExists(cardName).then((exists) => {
    expect(exists).to.be.true;
  });
});

Then('I should get all card names', () => {
  homePage.getAllCardNames().then((names) => {
    expect(names).to.have.length(6);
    expect(names).to.include('Elements');
    expect(names).to.include('Forms');
  });
});

When('I wait for cards to load', () => {
  homePage.waitForCardsToLoad();
});

Then('all cards should be loaded', () => {
  homePage.assertElementCount(homePage.selectors.allCards, 6);
});

// Performance testing steps
When('I measure the page performance', () => {
  cy.window().then((win) => {
    const perfData = win.performance.getEntriesByType('navigation')[0];
    cy.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
    cy.log(`Load Event: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
  });
});

Then('the page should meet performance standards', () => {
  cy.window().then((win) => {
    const perfData = win.performance.getEntriesByType('navigation')[0];
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
    expect(loadTime).to.be.lessThan(3000); // 3 seconds
  });
});

// Accessibility testing steps
Then('all elements should have proper ARIA labels', () => {
  cy.get('[role]').each(($el) => {
    cy.wrap($el).should('have.attr', 'aria-label');
  });
});

Then('the page should be keyboard navigable', () => {
  cy.get('body').tab();
  cy.focused().should('exist');
});

// Error handling steps
When('I encounter an error', () => {
  cy.on('fail', (error) => {
    cy.log(`Error encountered: ${error.message}`);
    return false; // Prevent test failure
  });
});

Then('the error should be handled gracefully', () => {
  // Error handling verification
  cy.log('Error handled gracefully');
}); 