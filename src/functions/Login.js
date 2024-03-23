
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: '1o40ad5otn7cb4glr43qut5js1',
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        const accessToken = data.AuthenticationResult.AccessToken;
        return {
            statusCode: 200,
            body: JSON.stringify({ accessToken }),
        };
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid credentials' }),
        };
    }
};
