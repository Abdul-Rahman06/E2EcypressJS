#!/usr/bin/env node

const ReportManager = require('./report-manager');
const fs = require('fs');
const path = require('path');

const reportManager = new ReportManager();

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
Cypress Report Manager

Usage: node scripts/manage-reports.js <command> [options]

Commands:
  archive [days]     Archive reports older than specified days (default: 7)
  clean [days]       Clean archived reports older than specified days (default: 30)
  combine [count]    Generate combined report from last N reports (default: 5)
  summary           Generate summary report of all reports
  list              List all new and archived reports
  extract <archive>  Extract a specific archived report

Examples:
  node scripts/manage-reports.js archive 7
  node scripts/manage-reports.js clean 30
  node scripts/manage-reports.js combine 10
  node scripts/manage-reports.js summary
  node scripts/manage-reports.js list
  node scripts/manage-reports.js extract 2024-01-15_14-30-00.zip
`);
}

async function main() {
  try {
    switch (command) {
      case 'archive':
        const archiveDays = parseInt(args[1]) || 7;
        console.log(`Archiving reports older than ${archiveDays} days...`);
        await reportManager.archiveOldReports(archiveDays);
        break;

      case 'clean':
        const cleanDays = parseInt(args[1]) || 30;
        console.log(`Cleaning archived reports older than ${cleanDays} days...`);
        reportManager.cleanOldArchives(cleanDays);
        break;

      case 'combine':
        const reportCount = parseInt(args[1]) || 5;
        console.log(`Generating combined report from last ${reportCount} reports...`);
        await reportManager.generateCombinedReport();
        break;

      case 'summary':
        console.log('Generating summary report...');
        const summary = reportManager.generateSummaryReport();
        console.log('\nSummary Report:');
        console.log(`New Reports: ${summary.newReports.count}`);
        console.log(`Archived Reports: ${summary.archivedReports.count}`);
        console.log(`Total Size (New): ${(summary.totalSize.newReports / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Total Size (Archived): ${(summary.totalSize.archivedReports / 1024 / 1024).toFixed(2)} MB`);
        break;

      case 'list':
        console.log('\n=== New Reports ===');
        const newReports = reportManager.getNewReportDirs();
        if (newReports.length === 0) {
          console.log('No new reports found');
        } else {
          newReports.forEach(report => {
            const reportPath = path.join(reportManager.newReportsDir, report);
            const stats = fs.statSync(reportPath);
            const size = (reportManager.calculateDirectorySize(reportPath) / 1024 / 1024).toFixed(2);
            console.log(`${report} (${size} MB) - ${stats.mtime.toLocaleString()}`);
          });
        }

        console.log('\n=== Archived Reports ===');
        const archivedReports = fs.existsSync(reportManager.archivedReportsDir)
          ? fs.readdirSync(reportManager.archivedReportsDir).filter(item => item.endsWith('.zip'))
          : [];
        
        if (archivedReports.length === 0) {
          console.log('No archived reports found');
        } else {
          archivedReports.forEach(archive => {
            const archivePath = path.join(reportManager.archivedReportsDir, archive);
            const stats = fs.statSync(archivePath);
            const size = (stats.size / 1024 / 1024).toFixed(2);
            console.log(`${archive} (${size} MB) - ${stats.mtime.toLocaleString()}`);
          });
        }
        break;

      case 'extract':
        const archiveName = args[1];
        if (!archiveName) {
          console.error('Please specify an archive name to extract');
          process.exit(1);
        }
        
        const archivePath = path.join(reportManager.archivedReportsDir, archiveName);
        if (!fs.existsSync(archivePath)) {
          console.error(`Archive ${archiveName} not found`);
          process.exit(1);
        }

        const extractPath = path.join(reportManager.reportsDir, 'extracted', archiveName.replace('.zip', ''));
        if (!fs.existsSync(path.dirname(extractPath))) {
          fs.mkdirSync(path.dirname(extractPath), { recursive: true });
        }

        console.log(`Extracting ${archiveName} to ${extractPath}...`);
        // Note: This would require an unzip library like 'unzipper'
        console.log('Extraction feature requires additional setup with unzipper library');
        break;

      case 'help':
      case '--help':
      case '-h':
        showHelp();
        break;

      default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
} 