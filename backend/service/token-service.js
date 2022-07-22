const jwt = require('jsonwebtoken');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken
    }
  }

  // async saveToken(userId, refreshToken) {
  //   let tokenData;
  //   await mysqlConnection.query(`SELECT Id FROM tokensdb WHERE UserId = "${userId}";`,
  //     function (err, results, fields) {
  //       tokenData = results[0].Id;
  //     });
  //   if (tokenData) {
  //     // tokenData.refreshToken = refreshToken;
  //     await mysqlConnection.query(`UPDATE tokensdb SET refreshToken=${refreshToken} WHERE UserId=${userId}`,
  //       function (err, results, fields) {
  //         console.log('UPDATE tokensDB');
  //       });
  //   }

  //   await mysqlConnection.query(`INSERT tokensdb( UserId, refreshToken) VALUES( ${userId},  ${refreshToken})`,
  //     function (err, results, fields) {
  //       console.log('INSERT tokensdb');
  //     });
  // }
}


module.exports = new TokenService();
// const user = await mysqlConnection.query(`INSERT usersdb(Email, Password, ActivationLink ) VALUES( ${email},  ${hashPassword} ,${activationLink})`,
// function (err, results, fields) {

// });
