"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      last_name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.INTEGER,
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
        type: _sequelize2.default.FLOAT,
        validate: {
          isFloat: {
            msg: 'ERROR, Some value is not a FLOAT !',
          },
        },
      },
      width: {
        type: _sequelize2.default.FLOAT,
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
} exports.default = Student;
