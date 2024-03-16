"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class StudentController {
  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      const { name, last_name, age } = student;
      return res.json({ name, last_name, age });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "ERROR, Id wasn't sent !",
      });
    }
    try {
      const studentIs = await _Student2.default.findByPk(
        id,
        {
          attributes: ['id', 'name', 'email'],
          order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
          include: {
            model: _Picture2.default,
            attributes: ['url', 'filename', 'originalname'],
          },
        },
      );
      if (!studentIs) {
        return res.status(400).json({
          error: ['ERROR !, Something went wrong'],
        });
      }
      return res.json(studentIs);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
        include: {
          model: _Picture2.default,
          attributes: ['url', 'filename', 'originalname'],
        },
      });
      return res.json(students);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "ERROR, Id wasn't sent !",
      });
    }
    try {
      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          error: 'ERROR, Something went wrong !',
        });
      }
      const studentUpdated = await student.update(req.body);
      const { name, last_name, age } = studentUpdated;
      return res.json({
        update: 'SUCCESS',
        name,
        last_name,
        age,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "ERROR, Id wasn't sent",
      });
    }
    try {
      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          error: 'ERROR, Something went wrong !',
        });
      }
      await student.destroy();
      return res.json({ deleted: 'SUCCESS' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new StudentController();
