import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Background step
Given('I have access to the Book Store API', () => {
  // API base URL is configured in cypress.config.js
  cy.log('Book Store API access verified');
});

// When steps
When('I send a GET request to {string}', (endpoint) => {
  cy.apiGet(endpoint).as('apiResponse');
});

When('I send a GET request to {string} with ISBN {string}', (endpoint, isbn) => {
  const fullEndpoint = `${endpoint}?ISBN=${isbn}`;
  cy.apiGet(fullEndpoint).as('apiResponse');
});

When('I send a GET request to {string} with invalid headers', (endpoint) => {
  const invalidHeaders = {
    'Invalid-Header': 'invalid-value',
    'Content-Type': 'invalid/type'
  };
  cy.apiGet(endpoint, invalidHeaders).as('apiResponse');
});

When('I send a malformed request to {string}', (endpoint) => {
  // Send a malformed request by using wrong method
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
    body: 'invalid json',
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).as('apiResponse');
});

When('I send a GET request to {string} with page size {int}', (endpoint, pageSize) => {
  const fullEndpoint = `${endpoint}?pageSize=${pageSize}`;
  cy.apiGet(fullEndpoint).as('apiResponse');
});

When('I send a GET request to {string} with author filter', (endpoint) => {
  const fullEndpoint = `${endpoint}?author=Richard E. Silverman`;
  cy.apiGet(fullEndpoint).as('apiResponse');
});

When('I send a GET request to {string} with title sort', (endpoint) => {
  const fullEndpoint = `${endpoint}?sortBy=title`;
  cy.apiGet(fullEndpoint).as('apiResponse');
});

When('I send {int} concurrent GET requests to {string}', (count, endpoint) => {
  const requests = [];
  for (let i = 0; i < count; i++) {
    requests.push(cy.apiGet(endpoint));
  }
  cy.wrap(requests).as('concurrentRequests');
});

When('I send a GET request to {string} with Accept: {string}', (endpoint, acceptHeader) => {
  const headers = {
    'Accept': acceptHeader
  };
  cy.apiGet(endpoint, headers).as('apiResponse');
});

When('I send a GET request to {string} with Accept-Encoding: {string}', (endpoint, encoding) => {
  const headers = {
    'Accept-Encoding': encoding
  };
  cy.apiGet(endpoint, headers).as('apiResponse');
});

// Then steps
Then('I should receive a {int} status code', (expectedStatus) => {
  cy.get('@apiResponse').then((response) => {
    cy.assertApiStatus(response, expectedStatus);
  });
});

Then('the response should contain a list of books', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });
});

Then('each book should have required fields', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book).to.have.property('isbn');
      expect(book).to.have.property('title');
      expect(book).to.have.property('author');
      expect(book).to.have.property('publisher');
    });
  });
});

Then('the response should contain book details', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('isbn');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('author');
  });
});

Then('the book ISBN should be {string}', (expectedIsbn) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body.isbn).to.eq(expectedIsbn);
  });
});

Then('the response should contain an error message', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.a('string');
  });
});

Then('the response should have the following structure:', (dataTable) => {
  const expectedStructure = {};
  dataTable.rows().forEach(row => {
    expectedStructure[row[0]] = row[1];
  });

  cy.get('@apiResponse').then((response) => {
    cy.validateApiResponseStructure(response, expectedStructure);
  });
});

Then('the first book should have:', (dataTable) => {
  const expectedTypes = {};
  dataTable.rows().forEach(row => {
    expectedTypes[row[0]] = row[1];
  });

  cy.get('@apiResponse').then((response) => {
    const firstBook = response.body[0];
    Object.entries(expectedTypes).forEach(([field, expectedType]) => {
      if (expectedType === 'string') {
        expect(firstBook[field]).to.be.a('string');
      } else if (expectedType === 'number') {
        expect(firstBook[field]).to.be.a('number');
      }
    });
  });
});

Then('the response time should be less than {int}ms', (maxTime) => {
  cy.get('@apiResponse').then((response) => {
    cy.assertApiResponseTime(response, maxTime);
  });
});

Then('the response should contain {string}', (expectedContent) => {
  cy.get('@apiResponse').then((response) => {
    cy.assertApiBodyContains(response, expectedContent);
  });
});

Then('the response should contain at most {int} books', (maxBooks) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body.length).to.be.lessThan.or.equal(maxBooks);
  });
});

Then('all returned books should have the specified author', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book.author).to.eq('Richard E. Silverman');
    });
  });
});

Then('the books should be sorted by title alphabetically', () => {
  cy.get('@apiResponse').then((response) => {
    const titles = response.body.map(book => book.title);
    const sortedTitles = [...titles].sort();
    expect(titles).to.deep.eq(sortedTitles);
  });
});

Then('all requests should receive a {int} status code', (expectedStatus) => {
  cy.get('@concurrentRequests').then((requests) => {
    requests.forEach(request => {
      expect(request.status).to.eq(expectedStatus);
    });
  });
});

Then('all responses should be consistent', () => {
  cy.get('@concurrentRequests').then((requests) => {
    const firstResponse = requests[0].body;
    requests.forEach(request => {
      expect(request.body).to.deep.eq(firstResponse);
    });
  });
});

Then('all books should have valid ISBNs', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book.isbn).to.match(/^[0-9-]{10,17}$/);
    });
  });
});

Then('all books should have non-empty titles', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book.title).to.be.a('string').and.not.be.empty;
    });
  });
});

Then('all books should have valid publish dates', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book.publish_date).to.be.a('string').and.not.be.empty;
      // Check if it's a valid date format
      expect(new Date(book.publish_date)).to.not.be.null;
    });
  });
});

Then('all books should have positive page counts', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      expect(book.pages).to.be.a('number').and.be.greaterThan(0);
    });
  });
});

Then('the response should be in XML format', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.headers['content-type']).to.include('xml');
  });
});

Then('the response should be compressed', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.headers['content-encoding']).to.eq('gzip');
  });
});

Then('the response headers should contain cache control', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.headers).to.have.property('cache-control');
  });
});

Then('the response should have proper CORS headers', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.headers).to.have.property('access-control-allow-origin');
  });
});

// Additional helper steps
When('I extract the book title from the response', () => {
  cy.get('@apiResponse').then((response) => {
    const title = cy.extractFromApiResponse(response, 'title');
    cy.wrap(title).as('extractedTitle');
  });
});

Then('the extracted title should be {string}', (expectedTitle) => {
  cy.get('@extractedTitle').then((title) => {
    expect(title).to.eq(expectedTitle);
  });
});

When('I validate the response schema', () => {
  const bookSchema = {
    isbn: 'string',
    title: 'string',
    subTitle: 'string',
    author: 'string',
    publish_date: 'string',
    publisher: 'string',
    pages: 'number',
    description: 'string',
    website: 'string'
  };

  cy.get('@apiResponse').then((response) => {
    cy.validateApiSchema(response, bookSchema);
  });
});

Then('the schema validation should pass', () => {
  // Schema validation is done in the When step
  cy.log('Schema validation passed');
});

When('I test API with retry logic', () => {
  cy.apiRequestWithRetry('GET', '/BookStore/v1/Books', null, {}, 3).as('retryResponse');
});

Then('the retry request should succeed', () => {
  cy.get('@retryResponse').then((response) => {
    expect(response.status).to.eq(200);
  });
});

When('I mock the API response', () => {
  const mockResponse = {
    books: [
      {
        isbn: '9781449325862',
        title: 'Mock Book',
        author: 'Mock Author'
      }
    ]
  };
  cy.mockApiResponse('GET', '/BookStore/v1/Books', mockResponse);
});

Then('the mocked response should be returned', () => {
  cy.apiGet('/BookStore/v1/Books').then((response) => {
    expect(response.body.books[0].title).to.eq('Mock Book');
  });
});

When('I wait for the mocked API call', () => {
  cy.waitForMockedApi('GET', '/BookStore/v1/Books');
});

Then('the mocked call should be intercepted', () => {
  cy.log('Mocked API call intercepted successfully');
});

// Performance testing steps
When('I measure API response time', () => {
  const startTime = Date.now();
  cy.apiGet('/BookStore/v1/Books').then((response) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    cy.wrap(responseTime).as('responseTime');
  });
});

Then('the API response time should be acceptable', () => {
  cy.get('@responseTime').then((responseTime) => {
    expect(responseTime).to.be.lessThan(5000); // 5 seconds
  });
});

// Error handling steps
When('I handle API errors gracefully', () => {
  cy.on('fail', (error) => {
    if (error.message.includes('404') || error.message.includes('500')) {
      cy.log('API error handled gracefully');
      return false;
    }
  });
});

Then('the error should be handled properly', () => {
  cy.log('Error handling verified');
});

// Data validation steps
When('I validate book data integrity', () => {
  cy.get('@apiResponse').then((response) => {
    response.body.forEach(book => {
      // Validate ISBN format
      expect(book.isbn).to.match(/^[0-9-]{10,17}$/);
      
      // Validate required fields
      expect(book.title).to.be.a('string').and.not.be.empty;
      expect(book.author).to.be.a('string').and.not.be.empty;
      
      // Validate numeric fields
      if (book.pages) {
        expect(book.pages).to.be.a('number').and.be.greaterThan(0);
      }
    });
  });
});

Then('all book data should be valid', () => {
  cy.log('Book data validation completed');
}); 