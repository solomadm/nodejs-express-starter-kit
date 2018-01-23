const validate = require("validate.js");
const Q = require('q');
const moment = require('moment');

/** Extend validate.js **/
validate.Promise = Q.Promise;
validate.extend(validate.validators.datetime, {
    parse: function(value, options) {
        return +moment.utc(value);
    },
    format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
        return moment.utc(value).format(format);
    }
});

let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

let routeConstraints = {
    login: {
        username: {
            presence: true
        },
        password: {
            presence: true
        }
    },

    registerUser:{
        username: {
            presence: true
        },
        password: {
            presence: true,
            length: {
                minimum: 8,
                maximum: 50
            },
            format: {
                pattern: passwordPattern,
                message: 'Password must be at least 8 digits long, and it must contain at least 1 number and 1 uppercase and lowercase character'
            }
        },
        email: {
            email: true,
            presence: true
        }
    },

    registerUserWithInvCode: {
        inv_code: {
            presence: true
        }
    }
};


module.exports = {
    validate,
    routeConstraints
};