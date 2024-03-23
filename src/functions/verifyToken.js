const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

async function verifyTokenSignature(accessToken) {
    // Fetch the JWKS containing the public keys
    const decodedToken = jwt.decode(accessToken, { complete: true });
    const jwks = {
        "keys": [
          {
            "alg": "RS256",
            "e": "AQAB",
            "kid": "9A91S/KutdMbBTMR658FcrZVklsElyiIazwRjPFeCb8=",
            "kty": "RSA",
            "n": "p7gIGnHS8dkuk3Ef4sx6jjjron4cqLd0FhumLo8irnG_DOxeKbLB2PDX_gGlHOY6WUKzq-6cNKUoh55oGENit2Itf92WXmwl9a0z2FppK_senETpOItd8VvemXUGF3NbfS5yp_iXl6erR1HTRerD6wy57hDm1--3EpMkdsVEfdc67oxDFh0kMvSl9L7WNN96PBOBSdNaFH3kawn_ZXprjXGaZ-o2zsQGtaztZr_WiG8mHBOLH19eND0dcMqW9WRicn0GJshfru3tupSkTpKkaXWmicaEGWjwIqpGYdhtyoUl2ezAuIFhSmVNHS3gqjGAtRTkDPXIfDpkcZP9WG0pLQ",
            "use": "sig"
          },
          {
            "alg": "RS256",
            "e": "AQAB",
            "kid": "UVj/R7XWDrOjXh8DqJ7xVxj2HW7dATQaD0QDu/11rwg=",
            "kty": "RSA",
            "n": "yKJz0Tl9qwZO17ezy-DryZdkpADBGHSy9VK8yaIsCZeyNGUbKDEIGAyWuG0Zviu6zaWc8bK27Vol5-wsx2udmlCXBdGlMZTn_wQNn_PuUaCqXtt5vr4Kxmit9LaW5ecH1iwCw4LeeKN774jA_orzs40g3z9fxL1HZi1YfWD75pLlFpUR8K4_WZ9HCV16yyhQJ7w8ARFjaKVE8Kfm1bdFYuntUsyCJS_GJjnILebdNbBCInuZpxw7TTglya6ncLRxNHyKvKYdnizZwI1XxuBAebnckvQHmiaIxxEktc-DaiLa8JPhFHJKoj2EZkDtEyXD1fgNbUQsyYHlSu-lv5fqIw",
            "use": "sig"
          }
        ]
    };
    console.log(jwks.keys[1])
    // Convert the JWKS to PEM format
    const pem = jwkToPem(jwks.keys[1]); // Assuming there's only one key in the JWKS

    console.log(pem); //
    try {
        // Verify the signature using the public key (PEM)
        const verificationResult = jwt.verify(accessToken, pem, { algorithms: ['RS256'] });

        // If the verification succeeds, return the decoded token
        return verificationResult;
    } catch (error) {
        // Handle verification error
        console.error('Token verification failed:', error.message);
        throw error;
    }
}

async function fetchJWKS() {
    const jwksUrl = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_PYozxhiFE/.well-known/jwks.json';
    const response = await axios.get(jwksUrl);
    return response.data;
}

module.exports = verifyTokenSignature;
