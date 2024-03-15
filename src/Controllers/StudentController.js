/* eslint-disable camelcase */
import Picture from '../models/Picture';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    try {
      const student = await Student.create(req.body);
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
      const studentIs = await Student.findByPk(
        id,
        {
          attributes: ['id', 'name', 'email'],
          order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
          include: {
            model: Picture,
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
      const students = await Student.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
        include: {
          model: Picture,
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
      const student = await Student.findByPk(id);
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
      const student = await Student.findByPk(id);
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
export default new StudentController();
