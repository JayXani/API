/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const aNewUser = await User.create(req.body);
      const { id, name, email } = aNewUser;
      res.json({ id, name, email });
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Method of listing users
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] }); // Return all data users
      return res.json({ users });
    } catch (e) {
      return res.json(null);
    }
  }

  // This method return one user
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // This method search one user and update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId); // userId is coming the of loginRequired
      if (!user) return res.json({ error: 'User not exist !' });
      const userUpdated = await user.update(req.body);
      const { id, name, email } = userUpdated;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // This method search one user and delete
  async delete(req, res) {
    try {
      const deleteUser = await User.findByPk(req.userId);
      if (!deleteUser) return res.json({ error: 'User not exists !' });
      await deleteUser.destroy();
      return res.json({ success: 'User deleted !' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
