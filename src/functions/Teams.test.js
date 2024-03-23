const { connectToDatabase, disconectToDatabase } = require('../services/mongo');
const { getTeams, postTeam, getaTeam, deletaaTeam} = require('./Teams');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

describe('Testing return teams', () => {
    beforeAll(async () => {
        await connectToDatabase();
    });

    afterAll(async() => {
        await disconectToDatabase();
    });

    describe('Test GET /teams', () => {
        test('It should respond with 200 success for valid image id', async () => {
          const response = await getTeams();
          expect(response.statusCode).toBe(200);
        });
    });    
    
    describe('Test Post /team', () => {
        // Construct the full path to the image file
        const imagePath = path.join(__dirname, 'test.jpg');

        // Read the image file as a Buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Convert the image buffer to a base64 string
        const imageBase64 = imageBuffer.toString('base64')
        const formData = { id: '1', name: 'FIFA', about: 'Many words', image: imageBase64, contentType: 'many words' };

        test('It should respond with 201 created', async () => {
            // Send the FormData object to your Lambda handler
            const response = await postTeam(formData);
            // Assertions for the response
            // For example:
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual("Team uploaded and saved successfully");
        });
    });    

    describe('Test GET /team/{id}', () => {
        test('It should respond with 200 success for valid image id', async () => {
          // Mock event object with pathParameters
          const event = {
            pathParameters: {
              id: '1'
            }
          };
          const response = await getaTeam(event);
      
          // Assert the response status code
          expect(response.statusCode).toBe(200);
        });
    });

    describe('Test Delete /team/{id}', () => {
        test('It should respond with 200 success for valid image id', async () => {
          // Mock event object with pathParameters
          const event = {
            pathParameters: {
              id: '1'
            }
          };
          const response = await deletaaTeam(event);
      
          // Assert the response status code
          expect(response.statusCode).toBe(200);
        });
    });
});