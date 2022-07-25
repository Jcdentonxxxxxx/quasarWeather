const User = require('../models/User');


module.exports = {
  async create(req, res) {

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

  },

  async update(req, res) {

  },

  async delete(req, res) {

  }


};
