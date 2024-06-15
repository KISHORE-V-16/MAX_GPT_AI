const { Router } = require("express");
const authrouter  = Router();
const Controller_fxn = require('../Controlroom/userauth');

authrouter.post('/login',Controller_fxn.loginUser);
authrouter.post('/register',Controller_fxn.registerUser);
authrouter.get('/authorized',Controller_fxn.authMiddleware);

module.exports = authrouter;