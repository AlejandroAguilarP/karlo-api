const {Router} = require('express');
const userController = require('../controllers/user.controller.js');

const router_auth = Router();


router_auth.post('/login', userController.login);
router_auth.post('/register', userController.register);



module.exports = router_auth;
