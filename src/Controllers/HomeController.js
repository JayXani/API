import Student from '../models/Student';

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
export default new HomeController();
