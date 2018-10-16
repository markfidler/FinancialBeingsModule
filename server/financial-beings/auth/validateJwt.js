'use strict';

const util = require('util');
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const jwksSigingKey = util.promisify(jwks.getSigningKey).bind(jwks);

/**
* Verify users JWT
* @param {string} token - JWT Token
* @return {object} Jwt object
* @error {object} Error
*/
async function validateIdToken(token) {
  try {
    const clearToken = token.split(' ')[1];
    const {header, payload} = jwt.decode(clearToken, {complete: true});
    if (!header || !header.kid || !payload) {
      throw new Error('Invalid Token');
    }
    const key = await jwksSigingKey(header.kid);

    return await jwt.verify(clearToken, key.publicKey, {algorithms: ['RS256']});
  } catch (err) {
    throw new Error('Validating token failed');
  }
}

module.exports = {
  validateIdToken: validateIdToken
};
