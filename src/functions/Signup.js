const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const params = {
        ClientId: 'your-cognito-app-client-id', // Replace with your actual Cognito App Client ID
        Username: username,
        Password: password
    };

    try {
        const data = await cognito.signUp(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User signed up successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
