"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();
router.get('/show/:id', _StudentController2.default.show);
router.get('/index', _StudentController2.default.index);
router.post('/create', _loginRequired2.default, _StudentController2.default.store); // If user send the token, he can create a new student
router.put('/update/:id', _loginRequired2.default, _StudentController2.default.update);
router.delete('/delete/:id', _loginRequired2.default, _StudentController2.default.delete);
exports. default = router;
