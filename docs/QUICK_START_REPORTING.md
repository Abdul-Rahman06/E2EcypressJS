# Quick Start Guide to our Reporting System
## 📁 Directory Structure Created

```
cypress/reports/
├── new/                    # New reports (timestamped)
├── archived/              # Archived reports (ZIP files)
├── combined/              # Combined reports
└── summary.json          # Summary of all reports
```

## 🛠️ Available Commands

### Test Execution
```bash
# Run all tests with automatic report generation
npm run test

# Run specific test suites
npm run test:api
npm run test:ui
```

### Report Management
```bash
# Archive reports older than 7 days
npm run reports:archive

# Clean old archives (older than 30 days)
npm run reports:clean

# Generate combined report from last 5 runs
npm run reports:combine

# View summary of all reports
npm run reports:summary

# List all reports
npm run reports:list
```

## 📊 What Happens When You Run Tests

1. **Automatic Timestamping**: Each test run creates a timestamped directory
2. **Organized Reports**: HTML, JSON, screenshots, and videos are organized by type
3. **Performance Tracking**: Automatic capture of performance metrics
4. **Metadata Collection**: Test metadata is captured for reporting

## 🔧 Configuration

The system is pre-configured in:
- `cypress.config.js` - Main Cypress configuration
- `.cypress-cucumber-preprocessorrc.json` - Cucumber reporting
- `scripts/report-manager.js` - Report management utilities

## 📈 Report Types Generated

- **HTML Reports**: Interactive dashboards with Mochawesome
- **JSON Reports**: Machine-readable format for API integration
- **Screenshots**: Automatic capture on failures and manual steps
- **Videos**: Complete test execution recordings
- **Performance Metrics**: Load times and performance data

## 🗂️ Report Organization

### New Reports
- Location: `cypress/reports/new/[timestamp]/`
- Format: Organized directories with all test artifacts
- Retention: 7 days (configurable)

### Archived Reports
- Location: `cypress/reports/archived/`
- Format: Compressed ZIP files
- Retention: 30 days (configurable)

## 🎯 Next Steps

1. **Run Your First Test**:
   ```bash
   npm run test
   ```

2. **Check Generated Reports**:
   ```bash
   npm run reports:list
   ```

3. **View Summary**:
   ```bash
   npm run reports:summary
   ```

4. **Archive Old Reports**:
   ```bash
   npm run reports:archive
   ```

## 📚 Documentation

For detailed information, see:
- `docs/REPORTING.md` - Comprehensive documentation
- `scripts/manage-reports.js --help` - Command-line help

## 🔍 Troubleshooting

If you encounter issues:

1. **Check Dependencies**:
   ```bash
   npm install
   ```

2. **Verify Configuration**:
   ```bash
   npm run reports:summary
   ```

3. **Check Permissions**:
   Ensure write access to `cypress/reports/` directory

## 🎉 You're Ready!

Your reporting system is now set up and ready to use. Each test run will automatically generate organized, timestamped reports that you can manage and archive as needed. 