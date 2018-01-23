let express = require('express');
const router = express.Router();
let authCtrl = require('../controllers/auth.controller');


router.route('/login').post(authCtrl.login);

router.route('/register').post(authCtrl.registerUser);


module.exports = router;