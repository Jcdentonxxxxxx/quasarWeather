let mysqlConnection = require('../index');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');

class UserService {
  async registration(email, password) {
    let checkUser;
    await mysqlConnection.query(`SELECT Email FROM usersdb WHERE Email = ${email};`,
      function (err, results, fields) {
        checkUser = result;
      });

    if (checkUser) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await mysqlConnection.query(`INSERT usersdb(Email, Password, ActivationLink ) VALUES( ${email},  ${hashPassword} ,${activationLink})`,
      function (err, results, fields) {

      });
    await mailService.sendActivationMail(email, activationLink);
  }
}


module.exports = new UserService();
