'use strict';

const Image = require('./Images.mongo'); // Import the model
const { connectToDatabase } = require('../services/mongo');
const verifyTokenSignature = require('./verifyToken');
const axios = require('axios');
var request = require('request');
const qs = require('querystring');

module.exports.getImagesss = async (event) => {
  const clientId = 'lpu3hkrbqconl553nqr950ui3';
  const clientSecret = '447kccfn6ep0dcqgjj1utgbessmeodqqii4sqm3ghaa2i191bhh';
  const authorizationHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const postData = {
    grant_type: 'authorization_code',
    code: 'faaaf0f5-534f-4c57-a6fb-0b9d5a00b263',
    redirect_uri: 'https://nextjs-psi-topaz-48.vercel.app/'
  };

  axios.post('https://demo-user-1.auth.us-east-1.amazoncognito.com/oauth2/token', qs.stringify(postData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authorizationHeader}`,
      'User-Agent': 'PostmanRuntime/7.37.0',
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Postman-Token': '633ed7e7-90f2-44b5-b8a7-61c2ec5785dd',
      'Host': 'demo-user-1.auth.us-east-1.amazoncognito.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Content-Length': '132',
      'Cookie': 'XSRF-TOKEN=dd8df5a1-c8e3-4052-8b0b-894c511f49fe'
    }
  })
  .then(response => {
    console.log('Response data:', response.data);
    console.log('ID Token:', response.data.id_token);
    console.log('Access Token:', response.data.access_token);
    console.log('Refresh Token:', response.data.refresh_token);
  })
  .catch(error => {
    console.error(error);
  });
  try {
    const verificationResult = await verifyTokenSignature(accessToken);
    const dbConnection = await connectToDatabase();
    const imageId = event.pathParameters.id;
    
    console.log('Image Id: ' + imageId);

    try {
      const image = await Image.findOne({ id: imageId });

      if (!image) {
        return {
          statusCode: 404,
          body: '<html><body><h1>Image not found</h1></body></html>',
          headers: {
            'Content-Type': 'text/html'
          }
        };
      } else {
        const imageData = image.data.toString('base64');
        const imageContentType = image.contentType;
        const imageBase64 = `data:${imageContentType};base64,${imageData}`;
        
        return {
          statusCode: 200,
          body: `
            <html>
              <head>
                <title>Image</title>
              </head>
              <body>
                <h1>Image Details</h1>
                <p>ID: ${image.id}</p>
                <p>Name: ${image.name}</p>
                <img src="${imageBase64}" alt="${image.name}">
              </body>
            </html>
          `,
          headers: {
            'Content-Type': 'text/html'
          }
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: '<html><body><h1>Internal Server Error</h1></body></html>',
        headers: {
          'Content-Type': 'text/html'
        }
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
