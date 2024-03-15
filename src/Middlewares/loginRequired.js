import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authorization.split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;
    const verifyUser = await User.findOne({
      where: { id, email },
    });
    if (!verifyUser) {
      return res.status(401).json({
        error: 'That user not exists !',
      });
    }
    req.userId = id; // I created
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};
