class UseController {
  async registration(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }
  async activate(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123', '567']);
    } catch (e) {

    }
  }
}

module.exports = new UseController();



// USE authentication;

// CREATE TABLE UsersDb
// (
//     Id INT PRIMARY KEY AUTO_INCREMENT,
//     Email VARCHAR(100) UNIQUE NOT NULL,
//     Password VARCHAR(100) NOT NULL,
//     IsActivated BOOLEAN default 0,
//     ActivationLink VARCHAR(100)
// );

// CREATE TABLE TokenDb
// (
//     UserId int,
//     refreshToken VARCHAR(255),
//     FOREIGN KEY (UserId)  REFERENCES UsersDb (Id)
// );
