// API helper utilities for making HTTP requests and handling responses

// Base API request with common headers
Cypress.Commands.add('apiRequest', (method, endpoint, body = null, headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers
  };

  const requestOptions = {
    method: method.toUpperCase(),
    url: endpoint.startsWith('http') ? endpoint : `${Cypress.env('apiBaseUrl')}${endpoint}`,
    headers: defaultHeaders,
    failOnStatusCode: false
  };

  if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return cy.request(requestOptions);
});

// GET request
Cypress.Commands.add('apiGet', (endpoint, headers = {}) => {
  return cy.apiRequest('GET', endpoint, null, headers);
});

// POST request
Cypress.Commands.add('apiPost', (endpoint, body, headers = {}) => {
  return cy.apiRequest('POST', endpoint, body, headers);
});

// PUT request
Cypress.Commands.add('apiPut', (endpoint, body, headers = {}) => {
  return cy.apiRequest('PUT', endpoint, body, headers);
});

// PATCH request
Cypress.Commands.add('apiPatch', (endpoint, body, headers = {}) => {
  return cy.apiRequest('PATCH', endpoint, body, headers);
});

// DELETE request
Cypress.Commands.add('apiDelete', (endpoint, headers = {}) => {
  return cy.apiRequest('DELETE', endpoint, null, headers);
});

// Upload file via API
Cypress.Commands.add('apiUploadFile', (endpoint, filePath, fieldName = 'file', additionalData = {}) => {
  return cy.fixture(filePath, 'binary').then((fileContent) => {
    const formData = new FormData();
    formData.append(fieldName, fileContent, filePath);
    
    // Add additional form data
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return cy.request({
      method: 'POST',
      url: endpoint.startsWith('http') ? endpoint : `${Cypress.env('apiBaseUrl')}${endpoint}`,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      failOnStatusCode: false
    });
  });
});

// Download file via API
Cypress.Commands.add('apiDownloadFile', (endpoint, fileName, headers = {}) => {
  return cy.request({
    method: 'GET',
    url: endpoint.startsWith('http') ? endpoint : `${Cypress.env('apiBaseUrl')}${endpoint}`,
    headers: {
      'Accept': '*/*',
      ...headers
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.writeFile(`cypress/downloads/${fileName}`, response.body);
    return response;
  });
});

// Assert API response status
Cypress.Commands.add('assertApiStatus', (response, expectedStatus) => {
  expect(response.status).to.eq(expectedStatus);
});

// Assert API response body contains
Cypress.Commands.add('assertApiBodyContains', (response, expectedContent) => {
  expect(response.body).to.contain(expectedContent);
});

// Assert API response body equals
Cypress.Commands.add('assertApiBodyEquals', (response, expectedBody) => {
  expect(response.body).to.deep.eq(expectedBody);
});

// Assert API response has property
Cypress.Commands.add('assertApiBodyHasProperty', (response, property) => {
  expect(response.body).to.have.property(property);
});

// Assert API response property equals
Cypress.Commands.add('assertApiBodyPropertyEquals', (response, property, expectedValue) => {
  expect(response.body[property]).to.eq(expectedValue);
});

// Assert API response time is less than
Cypress.Commands.add('assertApiResponseTime', (response, maxTime) => {
  expect(response.duration).to.be.lessThan(maxTime);
});

// Assert API response headers contain
Cypress.Commands.add('assertApiHeadersContain', (response, headerName, expectedValue) => {
  expect(response.headers[headerName.toLowerCase()]).to.contain(expectedValue);
});

// Wait for API response
Cypress.Commands.add('waitForApiResponse', (method, endpoint, expectedStatus = 200, timeout = 30000) => {
  return cy.waitUntil(() => {
    return cy.apiRequest(method, endpoint).then((response) => {
      return response.status === expectedStatus;
    });
  }, { timeout });
});

// Poll API until condition is met
Cypress.Commands.add('pollApiUntil', (method, endpoint, condition, timeout = 30000, interval = 1000) => {
  return cy.waitUntil(() => {
    return cy.apiRequest(method, endpoint).then((response) => {
      return condition(response);
    });
  }, { timeout, interval });
});

// Create API session with authentication
Cypress.Commands.add('createApiSession', (authEndpoint, credentials) => {
  return cy.apiPost(authEndpoint, credentials).then((response) => {
    if (response.status === 200 || response.status === 201) {
      // Store auth token in Cypress environment
      if (response.body.token) {
        Cypress.env('authToken', response.body.token);
      }
      if (response.body.access_token) {
        Cypress.env('authToken', response.body.access_token);
      }
    }
    return response;
  });
});

// API request with authentication
Cypress.Commands.add('authenticatedApiRequest', (method, endpoint, body = null, headers = {}) => {
  const authHeaders = {
    ...headers
  };

  const authToken = Cypress.env('authToken');
  if (authToken) {
    authHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  return cy.apiRequest(method, endpoint, body, authHeaders);
});

// Batch API requests
Cypress.Commands.add('batchApiRequests', (requests) => {
  const promises = requests.map(request => {
    return cy.apiRequest(request.method, request.endpoint, request.body, request.headers);
  });
  
  return Promise.all(promises);
});

// Validate API response schema
Cypress.Commands.add('validateApiSchema', (response, schema) => {
  // Simple schema validation - can be extended with JSON Schema validation library
  const validateSchema = (data, schema) => {
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in data)) {
        throw new Error(`Missing required property: ${key}`);
      }
      if (typeof data[key] !== type) {
        throw new Error(`Invalid type for property ${key}: expected ${type}, got ${typeof data[key]}`);
      }
    }
    return true;
  };

  return validateSchema(response.body, schema);
});

// Extract value from API response using JSONPath-like syntax
Cypress.Commands.add('extractFromApiResponse', (response, path) => {
  const keys = path.split('.');
  let value = response.body;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      throw new Error(`Path ${path} not found in response`);
    }
  }
  
  return value;
});

// API request with retry logic
Cypress.Commands.add('apiRequestWithRetry', (method, endpoint, body = null, headers = {}, maxRetries = 3) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return cy.apiRequest(method, endpoint, body, headers);
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        cy.wait(1000 * (i + 1)); // Exponential backoff
      }
    }
  }
  
  throw lastError;
});

// Mock API response
Cypress.Commands.add('mockApiResponse', (method, endpoint, response, statusCode = 200) => {
  cy.intercept(method, endpoint, {
    statusCode,
    body: response
  }).as(`mock_${method}_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`);
});

// Wait for mocked API call
Cypress.Commands.add('waitForMockedApi', (method, endpoint) => {
  const alias = `mock_${method}_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`;
  return cy.wait(`@${alias}`);
});

// API request with custom timeout
Cypress.Commands.add('apiRequestWithTimeout', (method, endpoint, body = null, headers = {}, timeout = 30000) => {
  return cy.apiRequest(method, endpoint, body, headers).timeout(timeout);
});

// Validate API response against expected structure
Cypress.Commands.add('validateApiResponseStructure', (response, expectedStructure) => {
  const validateStructure = (data, structure) => {
    for (const [key, expectedType] of Object.entries(structure)) {
      if (!(key in data)) {
        throw new Error(`Missing key: ${key}`);
      }
      
      const actualType = Array.isArray(data[key]) ? 'array' : typeof data[key];
      if (expectedType !== actualType) {
        throw new Error(`Invalid type for ${key}: expected ${expectedType}, got ${actualType}`);
      }
    }
  };

  return validateStructure(response.body, expectedStructure);
}); 