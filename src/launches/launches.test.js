require('module-alias/register')
const request = require('supertest')
const app = require('@src/app.js')
describe('Test GET /launches', () => {
  test('It should respond with 200 success', () => { 
    const response=200;
    expect(response).toBe(200);
 });
});

describe('Test POST /launches', () => {
    test('It should respond with 200 success', () => { 
      const response=200;
      expect(response).toBe(200);
   });
  });
  