"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class HomeController {
  async index(req, res) {
    console.log(req.body);

    // const student = await Student.create({
    //   name: 'Danilo',
    //   last_name: 'Araujo',
    //   email: 'danuloxaraujo@gmail.com',
    //   age: 19,
    //   height: 1.8,
    //   width: 61,
    // });
    res.json(req.body);
  }
}
exports. default = new HomeController();
