"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/no-unresolved */
var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// The routes under never must used
// router.get('/list', userController.index);
// router.get('/show', loginRequired, userController.show);
router.post('/store', _UserController2.default.store);
router.put('/update', _loginRequired2.default, _UserController2.default.update);
router.delete('/delete', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;
