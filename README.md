# Sauce Demo Test Automation Framework

A modern, robust test automation framework built with Cypress for testing the Sauce Demo e-commerce application.

## 🚀 Features

- **Modern Cypress Framework**: Built with Cypress 12.17.4 and Mocha/Chai
- **Page Object Model**: Clean, maintainable test structure
- **Dynamic Test Data**: Flexible test data management with JSON fixtures
- **Realistic Test Scenarios**: Comprehensive coverage of real user workflows
- **Simplified Reporting**: Mochawesome reports with embedded screenshots
- **Cross-browser Support**: Chrome, Firefox, and Electron
- **Responsive Testing**: Mobile, tablet, and desktop viewport testing
- **Error Handling**: Robust error handling for external script issues

## 🛠️ Tech Stack

- **Cypress**: 12.17.4
- **Mocha**: Test runner
- **Chai**: Assertion library
- **Mochawesome**: HTML reporting
- **JavaScript ES6**: Modern JavaScript features

## 📁 Project Structure

```
Cypress-frameworkJS/
├── cypress/
│   ├── e2e/
│   │   └── ui/
│   │       ├── login.spec.js
│   │       └── inventory.spec.js
│   ├── fixtures/
│   │   ├── testData.json
│   │   └── test-file.txt
│   ├── support/
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── pages/
│   │       ├── common.js
│   │       ├── LoginPage.js
│   │       └── InventoryPage.js
│   ├── videos/
│   └── screenshots/
├── reports/
├── cypress.config.js
├── mochawesome.json
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Cypress-frameworkJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Open Cypress Test Runner**
   ```bash
   npm run cypress:open
   ```

4. **Run tests in headless mode**
   ```bash
   npm test
   ```

## 📋 Test Commands

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# Login tests only
npm run test:login

# Inventory tests only
npm run test:inventory

# All UI tests
npm run test:ui
```

### Run Tests in Different Browsers
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Headed mode (with browser UI)
npm run test:headed
```

### Reporting
```bash
# Generate combined HTML report
npm run report

# Clean test artifacts
npm run clean

# Clean everything (including node_modules)
npm run clean:all
```

## 🧪 Test Coverage

### Login Functionality
- ✅ Standard user login
- ✅ Locked out user validation
- ✅ Invalid credentials handling
- ✅ Empty field validation
- ✅ Problem user scenarios
- ✅ Performance glitch user handling
- ✅ Form field clearing

### Inventory Management
- ✅ Product display verification
- ✅ Add/remove products from cart
- ✅ Product sorting (price, name)
- ✅ Cart functionality
- ✅ Menu navigation
- ✅ Product details navigation
- ✅ Responsive design testing

## 📊 Test Data Management

The framework uses dynamic test data stored in `cypress/fixtures/testData.json`:

### User Types
- **standard_user**: Normal user with full access
- **locked_out_user**: User account that's locked
- **problem_user**: User with UI issues
- **performance_glitch_user**: User with slow performance
- **error_user**: User with error scenarios
- **visual_user**: User for visual testing

### Products
- 6 different products with varying prices
- Product names, descriptions, and pricing
- Dynamic product selection for testing

## 📈 Reporting

### Mochawesome Reports
- **Location**: `reports/` directory
- **Format**: HTML with embedded screenshots
- **Features**: 
  - Test execution summary
  - Pass/fail statistics
  - Screenshot attachments
  - Test duration tracking
  - Error details

### Report Generation
```bash
# Generate combined report from all test runs
npm run report
```

## 🎯 Page Object Model

### BasePage (common.js)
- Common methods for all pages
- Dynamic test data loading
- Utility functions
- Error handling

### LoginPage
- User authentication
- Form validation
- Error message handling
- Multiple user type support

### InventoryPage
- Product management
- Cart operations
- Sorting functionality
- Navigation features

## 🔧 Configuration

### Cypress Configuration (cypress.config.js)
- Base URL: https://www.saucedemo.com
- Viewport: 1920x1080
- Timeouts: 10 seconds
- Retries: 2 for run mode, 0 for open mode
- Video recording: Enabled
- Screenshots: On failure

### Mochawesome Configuration (mochawesome.json)
- Report directory: `reports/`
- HTML and JSON output
- Timestamped reports
- Embedded screenshots

## 🐛 Error Handling

The framework includes robust error handling for:
- External script errors (ads, third-party scripts)
- Network timeouts
- Element visibility issues
- Dynamic content loading

## 📱 Responsive Testing

Tests include responsive design validation:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

## 🚀 Best Practices

1. **Page Object Model**: All page interactions are abstracted
2. **Dynamic Data**: Tests use flexible test data
3. **Realistic Scenarios**: Tests mirror real user behavior
4. **Error Handling**: Robust error handling throughout
5. **Clean Code**: Well-structured, maintainable code
6. **Documentation**: Comprehensive comments and documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the existing documentation
2. Review test examples
3. Create an issue in the repository

---

**Happy Testing! 🧪✨** 