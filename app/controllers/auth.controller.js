const LoginUser = require('../models/login-user');
const jwt = require("jwt-simple");
const config = require('../../config/env');
const {validate, routeConstraints} = require('../helpers/request-validator');
const {handleError} = require('../helpers/global-helper');
const passwordHash = require('password-hash');
const _ = require('lodash');


function login(req, res)
{
    let errors = validate(req.body, routeConstraints.login);

    if(!_.isEmpty(errors))
        return res.status(400).send({error: errors});

    LoginUser.findByField('user_name', req.body.username)
        .then(user => {

            if(!user)
                return res.status(404).send({error: 'User not found.'});

            if(!user || !passwordHash.verify(req.body.password, user.user_password))
            {
                res.status(401).send({error: 'Incorrect username or password'});
            }

            return  res.json({
                auth_key: generateToken(user.id),
                user: user
            })
        })
        .catch(err => {handleError(res, err, req.uuid)});
}


function registerUser(req, res)
{
    let errors = validate(req.body, routeConstraints.registerUser) || {};

    if(!_.isEmpty(errors))
        return res.status(400).send({error: errors});

    LoginUser.registerUser(req)
        .then(user => {

            if(user.error)
                return res.status(user.statusCode).send({error: user.error});

            res.json({
                auth_key: generateToken(user.id),
                user: user
            })
        })
        .catch(err => {handleError(res, err, req.uuid)});
}


function generateToken(userId)
{
    return jwt.encode({id: userId}, config.jwtSecret);
}


module.exports = {
    login,
    registerUser
};