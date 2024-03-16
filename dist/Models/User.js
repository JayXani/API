"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/no-extraneous-dependencies */
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 191], // This's rules of the length
            msg: 'ERROR ! Invalid name length !',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
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
      if (user.password) user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
    });
    this.tableName = 'users';
    return this;
  }

  async passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
