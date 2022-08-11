const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 78300,
  });
}

module.exports = {
  async login(req, res) {
    const {
      password,
      email,
      islogged
    } = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).send({
        status: 0,
        message: 'Неправильный адрес электронной почты или пароль!'
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        status: 0,
        message: 'Неверный пароль!'
      });
    }

    const user_id = user.id;

    await User.update({
      islogged
    }, {
      where: {
        id: user_id
      }
    });
    user.password = undefined;

    const token = generateToken({
      id: user.id
    });

    return res.status(200).send({
      status: 1,
      message: 'Пользователь успешно авторизовался!',
      user,
      token
    });
  },

  async index(req, res) {
    const users = await User.findAll();
    if (users == '' || users == null) {
      return res.status(200).send({
        message: "Users empty"
      });
    }

    return res.status(200).send({
      users
    });
  },

  async store(req, res) {
    const {
      name,
      password,
      email
    } = req.body;
    const user = await User.create({
      name,
      password,
      email,
    });

    const token = generateToken({
      id: user.id
    });

    return res.status(200).send({
      status: 1,
      message: "Пользователь успешно зарегистрирован!",
      user,
      token
    });
  },

  async update(req, res) {
    const {
      name,
      password,
      email
    } = req.body;

    const {
      user_id
    } = req.params;

    await User.update({
      name,
      password,
      email
    }, {
      where: {
        id: user_id
      }
    });

    return res.status(200).send({
      status: 1,
      message: "Пользователь успешно обновлен",
    });
  },

  async delete(req, res) {
    const {
      user_id
    } = req.params;

    await User.destroy({
      where: {
        id: user_id,
      }
    });

    return res.status(200).send({
      status: 1,
      message: "Пользователь успешно удален",
    });
  }


};
