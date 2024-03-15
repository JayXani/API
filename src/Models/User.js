/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 191], // This's rules of the length
            msg: 'ERROR ! Invalid name length !',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'ERROR ! Email already exists !',
        },
        validate: {
          isEmail: {
            msg: 'ERROR ! This is not an email !',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'ERROR ! Password invalid length',
          },
        },
      },
    }, {
      sequelize,
    });
    // The function below is executed automatically
    this.addHook('beforeSave', async (user) => { // Receive the object when it is sent
      // eslint-disable-next-line no-param-reassign
      if (user.password) user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    this.tableName = 'users';
    return this;
  }

  async passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
