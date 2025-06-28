# Cypress End-to-End Test Automation Framework by Abdul Rahman - Test Engineer

A comprehensive, production-ready test automation framework built with Cypress, Cucumber, and JavaScript following Page Object Model design pattern with advanced reporting capabilities.

## 🚀 Features

- **Cucumber Integration**: BDD approach with Gherkin syntax
- **Page Object Model**: Maintainable and scalable test structure
- **API Testing**: Integrated API testing capabilities
- **Custom Commands**: Reusable utility functions
- **Data-Driven Testing**: Support for multiple test data sets
- **Cross-Browser Testing**: Chrome, Firefox, Edge support
- **Parallel Execution**: Configurable parallel test runs
- **Advanced Reporting System**: 
  - 📊 **Organized Reports**: Timestamped directories with HTML, JSON, screenshots, and videos
  - 🗂️ **Separate New & Archived Reports**: Automatic organization and compression
  - 📈 **Performance Metrics**: Automatic capture of load times and performance data
  - 🔄 **Report Management**: CLI tools for archiving, cleaning, and combining reports
  - 📋 **Combined Reports**: Aggregated statistics from multiple test runs
  - 🎯 **Automatic Cleanup**: Configurable retention policies
- **Screenshot & Video**: Automatic capture on failures
- **Retry Logic**: Configurable retry mechanisms
- **Environment Support**: Multiple environment configurations

## 📁 Project Structure

```
cypress-frameworkJS/
├── cypress/
│   ├── e2e/
│   │   ├── ui/                    # UI test features
│   │   │   ├── homepage.feature
│   │   │   ├── forms.feature
│   │   │   ├── homepage.steps.js
│   │   │   └── forms.steps.js
│   │   └── api/                   # API test features
│   │       ├── books-api.feature
│   │       └── books-api.steps.js
│   ├── fixtures/                  # Test data
│   │   └── testData.json
│   ├── support/
│   │   ├── pages/                 # Page Object Models
│   │   │   ├── common.js          # Base page class
│   │   │   ├── HomePage.js
│   │   │   └── FormsPage.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── assertions.js      # Custom assertions
│   │   │   ├── helpers.js         # Helper functions
│   │   │   └── api-helpers.js     # API utilities
│   │   ├── commands.js            # Custom Cypress commands
│   │   ├── e2e.js                 # Support file
│   │   └── reporting.js           # Reporting utilities
│   ├── reports/                   # 📊 Advanced Reporting System
│   │   ├── new/                   # New reports (timestamped)
│   │   │   └── [timestamp]/
│   │   │       ├── html/          # HTML reports
│   │   │       ├── json/          # JSON reports
│   │   │       ├── screenshots/   # Test screenshots
│   │   │       └── videos/        # Test videos
│   │   ├── archived/              # Archived reports (ZIP files)
│   │   ├── combined/              # Combined reports
│   │   └── summary.json           # Summary of all reports
│   ├── downloads/                 # Downloaded files
│   ├── screenshots/               # Screenshots (legacy)
│   └── videos/                    # Test videos (legacy)
├── scripts/                       # Report management scripts
│   ├── report-manager.js          # Core reporting functionality
│   └── manage-reports.js          # CLI interface
├── docs/                          # Documentation
│   └── REPORTING.md               # Comprehensive reporting guide
├── cypress.config.js              # Cypress configuration
├── .cypress-cucumber-preprocessorrc.json  # Cucumber reporting config
├── package.json                   # Dependencies
├── QUICK_START_REPORTING.md       # Quick start guide for reporting
└── README.md                      # Documentation
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cypress-frameworkJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Cypress (if not already installed)**
   ```bash
   npx cypress install
   ```

## 🚀 Quick Start

### Running Tests

1. **Open Cypress Test Runner**
   ```bash
   npm run cypress:open
   ```

2. **Run all tests in headless mode**
   ```bash
   npm test
   ```

3. **Run specific test categories**
   ```bash
   # UI tests only
   npm run test:ui
   
   # API tests only
   npm run test:api
   
   # Specific browser
   npm run test:chrome
   npm run test:firefox
   ```

4. **Run tests with headed mode**
   ```bash
   npm run test:headed
   ```

### Test Execution Options

```bash
# Run specific feature file
npx cypress run --spec "cypress/e2e/ui/homepage.feature"

# Run tests with specific tags
npx cypress run --env grepTags="@smoke"

# Run tests in parallel
npx cypress run --parallel --record

# Run tests with custom configuration
npx cypress run --config baseUrl=https://demoqa.com
```

## 📊 Advanced Reporting System

### 🎯 Overview

The framework includes a comprehensive reporting system that automatically organizes test results into timestamped directories with separate new and archived reports.

### 📁 Report Organization

#### New Reports
- **Location**: `cypress/reports/new/[timestamp]/`
- **Format**: Organized directories with all test artifacts
- **Contents**: HTML, JSON, screenshots, videos, and performance metrics
- **Retention**: 7 days (configurable)

#### Archived Reports
- **Location**: `cypress/reports/archived/`
- **Format**: Compressed ZIP files
- **Contents**: Complete test run data including all assets
- **Retention**: 30 days (configurable)

#### Combined Reports
- **Location**: `cypress/reports/combined/`
- **Format**: JSON files with aggregated data
- **Purpose**: Trend analysis and historical data

### 🛠️ Report Management Commands

```bash
# Archive reports older than 7 days (default)
npm run reports:archive

# Archive reports older than specific days
npm run reports:archive 14

# Clean old archives (older than 30 days)
npm run reports:clean

# Clean archives older than specific days
npm run reports:clean 60

# Generate combined report from last 5 runs (default)
npm run reports:combine

# Generate combined report from last N runs
npm run reports:combine 10

# View summary of all reports
npm run reports:summary

# List all new and archived reports
npm run reports:list

# Extract specific archived report
npm run reports:extract 2024-01-15_14-30-00.zip
```

### 📈 Report Types Generated

- **HTML Reports**: Interactive dashboards with Mochawesome
- **JSON Reports**: Machine-readable format for API integration
- **Screenshots**: Automatic capture on failures and manual steps
- **Videos**: Complete test execution recordings
- **Performance Metrics**: Load times and performance data
- **Test Metadata**: Browser info, viewport, test duration

### 🔄 Automation & CI/CD Integration

#### Scheduled Cleanup
```bash
# Daily archive old reports (cron job)
0 2 * * * cd /path/to/project && npm run reports:archive

# Weekly clean old archives (cron job)
0 3 * * 0 cd /path/to/project && npm run reports:clean
```

#### GitHub Actions Integration
```yaml
- name: Run Tests
  run: npm run test

- name: Archive Reports
  run: npm run reports:archive

- name: Generate Summary
  run: npm run reports:summary

- name: Upload Reports
  uses: actions/upload-artifact@v2
  with:
    name: test-reports
    path: cypress/reports/
```

### 📋 Report Features

#### Automatic Timestamping
Each test run creates a unique timestamped directory:
```
cypress/reports/new/2024-01-15_14-30-00/
├── html/
├── json/
├── screenshots/
└── videos/
```

#### Performance Tracking
Automatic capture of:
- Page load times
- DOM content loaded time
- First paint metrics
- First contentful paint

#### Test Metadata
Captured for each test:
- Browser information
- Viewport dimensions
- Test duration
- Test state (passed/failed)

### 🎨 Customization

#### Retention Periods
```javascript
// In scripts/report-manager.js
await reportManager.archiveOldReports(14); // 14 days
reportManager.cleanOldArchives(60); // 60 days
```

#### Report Formats
```javascript
// In cypress.config.js
config.reporterOptions = {
  reporterEnabled: 'mochawesome, spec, junit',
  junitReporterOptions: {
    mochaFile: `cypress/reports/new/${timestamp}/junit/results.xml`
  }
};
```

### 📚 Documentation

- **Complete Guide**: `docs/REPORTING.md`
- **Quick Start**: `QUICK_START_REPORTING.md`
- **CLI Help**: `npm run reports:manage --help`

## 📝 Writing Tests

### Feature Files (Cucumber)

```gherkin
Feature: DemoQA Homepage
  As a user
  I want to navigate through the DemoQA website
  So that I can access different testing tools

  @smoke @homepage
  Scenario: Verify homepage loads successfully
    Given I am on the DemoQA homepage
    When I wait for the page to load completely
    Then I should see the DemoQA logo
    And I should see 6 category cards
```

### Step Definitions

```javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../support/pages/HomePage.js';

const homePage = new HomePage();

Given('I am on the DemoQA homepage', () => {
  homePage.navigateToHome();
});

When('I wait for the page to load completely', () => {
  homePage.waitForPageLoad();
});

Then('I should see the DemoQA logo', () => {
  homePage.assertIsVisible(homePage.selectors.logo);
});
```

### Page Objects

```javascript
import BasePage from './common.js';

class HomePage extends BasePage {
  constructor() {
    super();
    this.url = '/';
    this.selectors = {
      logo: '.navbar-brand',
      allCards: '.card-body'
    };
  }

  navigateToHome() {
    return this.visit(this.url);
  }

  assertPageLoaded() {
    this.assertIsVisible(this.selectors.logo);
    this.assertElementCount(this.selectors.allCards, 6);
    return this;
  }
}
```

## 🔧 Configuration

### Environment Variables

Create environment-specific configurations in `cypress.config.js`:

```javascript
env: {
  environment: 'staging',
  apiBaseUrl: 'https://demoqa.com',
  timeout: 10000
}
```

### Test Data

Store test data in `cypress/fixtures/testData.json`:

```json
{
  "users": {
    "validUser": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

## 🎯 Test Categories

### Tags

- `@smoke` - Critical functionality tests
- `@regression` - Comprehensive test suite
- `@api` - API testing scenarios
- `@ui` - User interface tests
- `@performance` - Performance testing
- `@security` - Security testing
- `@accessibility` - Accessibility testing

### Running Tagged Tests

```bash
# Run smoke tests only
npx cypress run --env grepTags="@smoke"

# Run multiple tags
npx cypress run --env grepTags="@smoke+@ui"

# Exclude specific tags
npx cypress run --env grepTags="@smoke-@slow"
```

## 📊 Legacy Reporting (Mochawesome)

### Mochawesome Reports

1. **Generate reports**
   ```bash
   npm run report
   ```

2. **View reports**
   - Reports are generated in `cypress/reports/`
   - Open `cypress/reports/index.html` in browser

### Custom Reports

The framework supports custom reporting configurations:

```javascript
// cypress.config.js
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v5
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
          browser: chrome
          record: true
      - name: Archive Reports
        run: npm run reports:archive
      - name: Generate Summary
        run: npm run reports:summary
      - name: Upload Reports
        uses: actions/upload-artifact@v2
        with:
          name: test-reports
          path: cypress/reports/
```

### Jenkins Pipeline Example

```groovy
pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Archive Reports') {
            steps {
                sh 'npm run reports:archive'
                sh 'npm run reports:summary'
            }
        }
        stage('Generate Reports') {
            steps {
                sh 'npm run report'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Test Report'
                ])
            }
        }
    }
}
```

## 🛠️ Custom Commands

### Available Commands

```javascript
// Element interactions
cy.waitAndClick(selector, options)
cy.clearAndType(selector, text, options)
cy.selectFromDropdown(selector, optionText)
cy.uploadFile(selector, fileName)
cy.scrollToElement(selector)

// Assertions
cy.assertElementContainsText(selector, expectedText)
cy.assertElementHasText(selector, expectedText)
cy.assertElementIsVisibleAndEnabled(selector)
cy.assertUrlContains(path)
cy.assertPageTitleContains(expectedTitle)

// API testing
cy.apiGet(endpoint, headers)
cy.apiPost(endpoint, body, headers)
cy.assertApiStatus(response, expectedStatus)
cy.assertApiBodyContains(response, expectedContent)

// Reporting utilities
cy.captureTestMetadata(metadata)
cy.logStep(stepName, takeScreenshot)
cy.capturePerformance()
cy.generateTestSummary()

// Utilities
cy.generateRandomData(type)
cy.waitForPageLoad()
cy.handleAlert(accept)
cy.elementExists(selector)
```

## 📱 Cross-Browser Testing

### Supported Browsers

- Chrome (default)
- Firefox
- Edge
- Electron (headless)

### Browser Configuration

```bash
# Run in specific browser
npm run test:chrome
npm run test:firefox

# Run in multiple browsers
npx cypress run --browser chrome --browser firefox
```

## 🔒 Security Testing

### XSS Prevention

```javascript
// Test script injection
When('I try to inject script in the first name field', () => {
  const scriptInjection = '<script>alert("XSS")</script>';
  formsPage.fillFirstName(scriptInjection);
});

Then('the script should be sanitized', () => {
  formsPage.assertModalVisible();
  // Verify no alert was triggered
});
```

## ♿ Accessibility Testing

### WCAG Compliance

```javascript
// Test keyboard navigation
Then('the page should be keyboard navigable', () => {
  cy.get('body').tab();
  cy.focused().should('exist');
});

// Test ARIA attributes
Then('all elements should have proper ARIA labels', () => {
  cy.get('[role]').each(($el) => {
    cy.wrap($el).should('have.attr', 'aria-label');
  });
});
```

## 📈 Performance Testing

### Page Load Performance

```javascript
// Measure page load time
When('I measure the page load time', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    cy.log(`Page load time: ${loadTime}ms`);
  });
});

Then('the page should load within 5 seconds', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    expect(loadTime).to.be.lessThan(5000);
  });
});
```

## 🐛 Debugging

### Debug Mode

```bash
# Run with debug logging
DEBUG=cypress:* npm test

# Open DevTools in headed mode
npm run test:headed
```

### Screenshots and Videos

- Screenshots are automatically captured on test failures
- Videos are recorded for all test runs
- Files are saved in `cypress/reports/new/[timestamp]/screenshots/` and `cypress/reports/new/[timestamp]/videos/`

### Console Logging

```javascript
// Add custom logging
cy.log('Custom test step message');
cy.log(`Current URL: ${cy.url()}`);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Code Style

- Use ESLint for code linting
- Follow JavaScript best practices
- Write descriptive test names
- Add comments for complex logic

## 📚 Best Practices

### Test Organization

1. **Group related tests** using feature files
2. **Use descriptive scenario names**
3. **Keep step definitions simple**
4. **Reuse common steps**

### Page Object Model

1. **Encapsulate selectors** in page objects
2. **Create reusable methods** for common actions
3. **Extend base page class** for common functionality
4. **Keep page objects focused** on single responsibility

### Data Management

1. **Use fixtures** for test data
2. **Generate random data** for unique tests
3. **Clean up test data** after tests
4. **Use environment-specific data**

### Error Handling

1. **Add retry logic** for flaky tests
2. **Handle network timeouts** gracefully
3. **Validate error messages** appropriately
4. **Log errors** for debugging

### Reporting Best Practices

1. **Regular cleanup** of old reports to save disk space
2. **Monitor report sizes** and generation times
3. **Backup important reports** before cleanup
4. **Use combined reports** for trend analysis
5. **Integrate reporting** into CI/CD pipelines

## 🆘 Troubleshooting

### Common Issues

1. **Element not found**
   - Check if element is in viewport
   - Add wait conditions
   - Verify selector is correct

2. **Test flakiness**
   - Add retry logic
   - Use stable selectors
   - Wait for network idle

3. **API test failures**
   - Verify endpoint URLs
   - Check authentication
   - Validate response format

4. **Reporting issues**
   - Check disk space availability
   - Verify write permissions to reports directory
   - Review report configuration in cypress.config.js

### Getting Help

- Check Cypress documentation
- Review test logs and screenshots
- Use Cypress debug mode
- Consult team members
- Check reporting documentation in `docs/REPORTING.md`


## 🙏 Acknowledgments

- Cypress team for the excellent testing framework
- Cucumber team for BDD support
- DemoQA for providing the test application
- Open source community for various utilities and tools

--- Contact 
GitHub: https://github.com/Abdul-Rahman06 
LinkedIn: https://www.linkedin.com/in/abdul-rehman-b6326a176/ 
Email: Rehmanalee05@gmail.com

**Happy Testing! 🚀** 