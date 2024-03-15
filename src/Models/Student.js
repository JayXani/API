// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'ERROR, Something went wrong !',
        },
        validate: {
          isEmail: {
            msg: 'ERROR, This is not email !',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: {
            msg: 'ERROR, Value is not a INTEGER !',
          },
          len: {
            args: [1, 3],
            msg: 'ERROR, age invalid',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: {
            msg: 'ERROR, Some value is not a FLOAT !',
          },
        },
      },
      width: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: {
            msg: 'ERROR, Some value is not a FLOAT !',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Picture, { foreignKey: 'pic_student_id' });
  }
}
