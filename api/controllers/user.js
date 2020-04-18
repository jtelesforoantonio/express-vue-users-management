const User = require('../models').user;
const {validationResult} = require('express-validator');
const UserController = {
  async index(req, res) {
    try {
      const limit = 10;
      let {page} = req.query;
      if (page === undefined) {
        page = 1;
      }
      const offset = (page - 1) * limit
      const total = await User.count();
      const totalPages = total / limit;
      const links = [];
      for (let i = 0; i < totalPages; i++) {
        links.push(`${process.env.APP_URL}/users?page=${i + 1}`);
      }
      const users = await User.findAll({
        attributes: ['id', 'nick', 'name', 'lastName', 'email', 'createdAt', 'updatedAt'],
        include: ['role'],
        limit,
        offset,
        order: [
          ['createdAt', 'DESC']
        ]
      });

      return res.status(200).json({users, meta: {total, links}});
    } catch (e) {
      return res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async show(req, res) {
    try {
      const user = await User.findOne({
        attributes: ['id', 'nick', 'name', 'lastName', 'email', 'createdAt', 'updatedAt'],
        include: ['role'],
        where: {
          id: req.params.id,
        }
      });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({errors: ['El usuario no existe']});
      }
    } catch (e) {
      return res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async store(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const newUser = await User.create(req.body);
      const user = await User.findByPk(newUser.id, {
        attributes: ['id', 'nick', 'name', 'lastName', 'email', 'createdAt', 'updatedAt'],
        include: ['role']
      });

      return res.status(200).json(user);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError' && e.errors[0].validatorKey === 'not_unique') {
        return res.status(422).json({errors: ['El nick ya esta en uso']});
      }
      return res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const user = await User.findByPk(req.params.id);
      await user.update(req.body);
      const userUpdated = await User.findByPk(user.id, {
        attributes: ['id', 'nick', 'name', 'lastName', 'email', 'createdAt', 'updatedAt'],
        include: ['role']
      });

      return res.status(200).json(userUpdated);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError' && e.errors[0].validatorKey === 'not_unique') {
        return res.status(422).json({errors: ['El nick ya esta en uso']});
      }
      return res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  },
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        user.destroy();
        return res.status(200).json();
      } else {
        return res.status(404).json({errors: ['El usuario no existe']});
      }
    } catch (e) {
      return res.status(500).json({errors: ['Ocurrió un error inesperado, inténtalo de nuevo']});
    }
  }
};

module.exports = UserController;
