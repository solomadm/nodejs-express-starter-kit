const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const developersRoute = require('./developers.route');
const { auth, loggerMiddleware } = require('../middlewares');

const router = express.Router(); // eslint-disable-line new-cap


router.use(loggerMiddleware.initLog);


router.get('/', (req, res) =>
    res.send('/api route is OK')
);

router.use('/auth', authRoutes);

router.use('/developer', auth.authenticate(), developersRoute);

router.use('/user', auth.authenticate(), userRoutes);

module.exports = router;