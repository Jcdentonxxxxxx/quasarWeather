const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');



class UserService {
  async registration(email, password) {
    let checkUser = false;
    // mysqlConnection.query(`SELECT Email FROM usersdb WHERE Email = "${email}";`,
    //   function (err, results, fields) {
    //     if (results[0]) {
    //       console.log(results);
    //       checkUser = results[0].Email;
    //       throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    //     }
    //   });

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();


    // mysqlConnection.query(`INSERT usersdb(Email, Password, ActivationLink ) VALUES( '${email}', '${hashPassword}', '${activationLink}')`,
    //   function (err, results, fields) {

    //   });
    // // await mailService.sendActivationMail(email, activationLink);

    let savedId;
    // mysqlConnection.query(`SELECT Id FROM usersdb WHERE Email = "${email}";`,
    //   function (err, results, fields) {
    //     savedId = results[0].Id;
    //   });

    const userDto = new UserDto({
      email: email,
      id: savedId,
      isActivated: true
    });

    console.log(userDto);
    // const tokens = tokenService.generateTokens({...userDto});
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      // ...tokens,
      user: userDto
    }
  }
}


module.exports = new UserService();
