const jwt = require('jsonwebtoken');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, );
  }
}


module.exports = new TokenService();
