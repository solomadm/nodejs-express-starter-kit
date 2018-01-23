let express = require('express');
const router = express.Router();
let usersCtrl = require('../controllers/users.controller');


router.route('/:id').get(usersCtrl.getUserById);


module.exports = router;