let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const passwordHash = require('password-hash');
const moment = require('moment');
const DATE_FORMATS = require('../../config/datetime-formats');
const _ = require('lodash');
const config = require('../../config/env');


let LoginUserSchema = new Schema({
    user_name: {type: String, unique: true},
    user_password: String,
    user_email: {type: String, unique: true},
    is_active: Boolean,
    create_time: Date,
    update_time: Date
});


LoginUserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.user_password;
    return obj;
};


LoginUserSchema.statics.findByField = function(field, value)
{
    console.log('field',field);
    console.log('value',value);

    return this.findOne({[field]: value})
        .then(user => user)
        .catch(err => {
            throw err;
        });
};


LoginUserSchema.statics.registerUser = function(req)
{
    let user = new this({
        user_name: req.body.username,
        user_password: passwordHash.generate(req.body.password),
        user_email: req.body.email,
        is_active: true,
        create_time: moment().format(DATE_FORMATS.DATETIME),
        update_time: moment().format(DATE_FORMATS.DATETIME)
    });

    return user.save();
};



module.exports = mongoose.model('LoginUser', LoginUserSchema, 'login_users');