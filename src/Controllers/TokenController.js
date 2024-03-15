// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          error: ['Credentials invalid !'],
        });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          error: ["User was't found !"],
        });
      }
      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          error: ['Password invalid !'],
        });
      }
      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      return res.json({ token, user: { name: user.name, id, email } });
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new TokenController();
