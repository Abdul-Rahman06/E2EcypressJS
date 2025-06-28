// Helper utility functions for common operations

// Generate random string
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate random email
export const generateRandomEmail = () => {
  const randomString = generateRandomString(8);
  return `${randomString}@example.com`;
};

// Generate random phone number
export const generateRandomPhone = () => {
  return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

// Generate random date
export const generateRandomDate = (start = new Date(2020, 0, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Format date to string
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
};

// Wait for element to be stable (no animations)
export const waitForElementStable = (selector, timeout = 5000) => {
  return new Cypress.Promise((resolve) => {
    let lastPosition = null;
    let stableCount = 0;
    const checkStability = () => {
      cy.get(selector).then(($el) => {
        const currentPosition = $el[0].getBoundingClientRect();
        if (lastPosition && 
            Math.abs(currentPosition.top - lastPosition.top) < 1 &&
            Math.abs(currentPosition.left - lastPosition.left) < 1) {
          stableCount++;
          if (stableCount >= 3) {
            resolve();
            return;
          }
        } else {
          stableCount = 0;
        }
        lastPosition = currentPosition;
        setTimeout(checkStability, 100);
      });
    };
    checkStability();
    setTimeout(() => resolve(), timeout);
  });
};

// Retry function with exponential backoff
export const retryWithBackoff = (fn, maxRetries = 3, baseDelay = 1000) => {
  return new Cypress.Promise((resolve, reject) => {
    let retries = 0;
    
    const attempt = () => {
      fn().then(resolve).catch((error) => {
        retries++;
        if (retries >= maxRetries) {
          reject(error);
          return;
        }
        const delay = baseDelay * Math.pow(2, retries - 1);
        setTimeout(attempt, delay);
      });
    };
    
    attempt();
  });
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
};

// Validate URL format
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convert string to camelCase
export const toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

// Convert string to kebab-case
export const toKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Merge objects deeply
export const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate test data based on type
export const generateTestData = (type, options = {}) => {
  const data = {
    firstName: `Test${generateRandomString(5)}`,
    lastName: `User${generateRandomString(5)}`,
    email: generateRandomEmail(),
    phone: generateRandomPhone(),
    address: `${Math.floor(Math.random() * 9999)} Test Street`,
    city: 'Test City',
    state: 'Test State',
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    country: 'United States',
    password: `Password${generateRandomString(5)}123!`,
    company: `Test Company ${generateRandomString(5)}`,
    website: `https://www.test${generateRandomString(5)}.com`,
    description: `This is a test description ${generateRandomString(10)}`,
    ...options
  };
  
  return type ? data[type] : data;
};

// Parse CSV string to array of objects
export const parseCSV = (csvString) => {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      result.push(obj);
    }
  }
  
  return result;
};

// Convert array of objects to CSV string
export const toCSV = (data, headers = null) => {
  if (!data || data.length === 0) return '';
  
  const csvHeaders = headers || Object.keys(data[0]);
  const csvContent = [
    csvHeaders.join(','),
    ...data.map(row => csvHeaders.map(header => row[header]).join(','))
  ];
  
  return csvContent.join('\n');
};

// Sleep function
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Generate UUID
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Sanitize string for file names
export const sanitizeFileName = (str) => {
  return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 