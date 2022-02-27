const express = require('express');
const authController = require('../controllers/Auth.controller');
const authRoute = express.Router();

authRoute.post('/',  authController.signInUser); // log in
authRoute.post('/new', authController.signUpUser);
authRoute.post('/token', authController.decodeToken);

module.exports = authRoute;