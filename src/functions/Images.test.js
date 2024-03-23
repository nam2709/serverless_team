const { connectToDatabase, disconectToDatabase } = require('../services/mongo');
const { getImagesss } = require('./Images');

describe('Testing return image', () => {
    beforeAll(async () => {
        await connectToDatabase();
    });

    afterAll(async() => {
        await disconectToDatabase();
    });

    test('somefunction', async () => {
        const a = 10;
        const b = 20;
        const result = 30;

        expect(a + b).toBe(result)
    });

    describe('Test GET /image/{id}', () => {
        test('It should respond with 200 success for valid image id', async () => {
          // Mock event object with pathParameters
          const event = {
            pathParameters: {
              id: '1'
            }
          };
      
          // Call the getImagesss function with the mock event
          const response = await getImagesss(event);
      
          // Assert the response status code
          expect(response.statusCode).toBe(200);
      
          // Assert other properties of the response
          // You can check the HTML body, headers, etc.
        });
      
        // Add more tests for different scenarios
    });      
});