const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

class ReportManager {
  constructor() {
    this.reportsDir = 'cypress/reports';
    this.newReportsDir = path.join(this.reportsDir, 'new');
    this.archivedReportsDir = path.join(this.reportsDir, 'archived');
    this.combinedReportsDir = path.join(this.reportsDir, 'combined');
  }

  getNewReportDirs() {
    if (!fs.existsSync(this.newReportsDir)) {
      return [];
    }
    return fs.readdirSync(this.newReportsDir)
      .filter(item => {
        const itemPath = path.join(this.newReportsDir, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .sort((a, b) => new Date(b) - new Date(a));
  }

  // Archive a specific report directory
  async archiveReport(reportDirName) {
    const sourcePath = path.join(this.newReportsDir, reportDirName);
    const archivePath = path.join(this.archivedReportsDir, `${reportDirName}.zip`);
    
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Report directory ${reportDirName} not found`);
    }

    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(archivePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        console.log(`Report archived: ${archivePath}`);
        console.log(`Total size: ${archive.pointer()} bytes`);
        resolve(archivePath);
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);
      archive.directory(sourcePath, reportDirName);
      archive.finalize();
    });
  }

  // Archive all reports older than specified days
  async archiveOldReports(daysOld = 7) {
    const reportDirs = this.getNewReportDirs();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const reportsToArchive = reportDirs.filter(dirName => {
      const dirDate = new Date(dirName.split('_')[0]);
      return dirDate < cutoffDate;
    });

    console.log(`Found ${reportsToArchive.length} reports to archive`);

    for (const reportDir of reportsToArchive) {
      try {
        await this.archiveReport(reportDir);
        // Remove the original directory after successful archiving
        const sourcePath = path.join(this.newReportsDir, reportDir);
        fs.rmSync(sourcePath, { recursive: true, force: true });
        console.log(`Removed original directory: ${sourcePath}`);
      } catch (error) {
        console.error(`Failed to archive ${reportDir}:`, error.message);
      }
    }
  }

  // Generate a combined report from multiple test runs
  async generateCombinedReport(reportDirs = []) {
    if (reportDirs.length === 0) {
      reportDirs = this.getNewReportDirs().slice(0, 5); // Last 5 reports
    }

    const combinedData = {
      summary: {
        totalRuns: reportDirs.length,
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        skippedTests: 0,
        averageDuration: 0
      },
      runs: []
    };

    for (const reportDir of reportDirs) {
      const jsonPath = path.join(this.newReportsDir, reportDir, 'json', 'cucumber-report.json');
      if (fs.existsSync(jsonPath)) {
        try {
          const reportData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          combinedData.runs.push({
            timestamp: reportDir,
            data: reportData
          });
        } catch (error) {
          console.error(`Error reading report ${reportDir}:`, error.message);
        }
      }
    }

    // Calculate summary statistics
    combinedData.runs.forEach(run => {
      if (run.data && run.data.length > 0) {
        run.data.forEach(feature => {
          feature.elements.forEach(scenario => {
            combinedData.summary.totalTests++;
            scenario.steps.forEach(step => {
              if (step.result.status === 'passed') {
                combinedData.summary.passedTests++;
              } else if (step.result.status === 'failed') {
                combinedData.summary.failedTests++;
              } else if (step.result.status === 'skipped') {
                combinedData.summary.skippedTests++;
              }
            });
          });
        });
      }
    });

    // Save combined report
    const combinedReportPath = path.join(this.combinedReportsDir, 'combined-report.json');
    fs.writeFileSync(combinedReportPath, JSON.stringify(combinedData, null, 2));
    console.log(`Combined report generated: ${combinedReportPath}`);

    return combinedData;
  }

  // Clean up old archived reports
  cleanOldArchives(daysOld = 30) {
    if (!fs.existsSync(this.archivedReportsDir)) {
      return;
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const archives = fs.readdirSync(this.archivedReportsDir)
      .filter(item => item.endsWith('.zip'));

    archives.forEach(archive => {
      const archivePath = path.join(this.archivedReportsDir, archive);
      const stats = fs.statSync(archivePath);
      
      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(archivePath);
        console.log(`Removed old archive: ${archive}`);
      }
    });
  }

  // Generate a summary report
  generateSummaryReport() {
    const newReports = this.getNewReportDirs();
    const archivedReports = fs.existsSync(this.archivedReportsDir) 
      ? fs.readdirSync(this.archivedReportsDir).filter(item => item.endsWith('.zip'))
      : [];

    const summary = {
      generatedAt: new Date().toISOString(),
      newReports: {
        count: newReports.length,
        directories: newReports
      },
      archivedReports: {
        count: archivedReports.length,
        files: archivedReports
      },
      totalSize: {
        newReports: this.calculateDirectorySize(this.newReportsDir),
        archivedReports: this.calculateDirectorySize(this.archivedReportsDir)
      }
    };

    const summaryPath = path.join(this.reportsDir, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`Summary report generated: ${summaryPath}`);

    return summary;
  }

  // Calculate directory size
  calculateDirectorySize(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return 0;
    }

    let totalSize = 0;
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        totalSize += this.calculateDirectorySize(itemPath);
      } else {
        totalSize += stats.size;
      }
    });

    return totalSize;
  }
}

module.exports = ReportManager; 