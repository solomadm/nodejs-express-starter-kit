const LoginUser = require('../models/login-user');

function getUserById(req, res)
{
    let userId = req.params.id;

    LoginUser.findOne({_id: userId})
        .then(user => {
            return res.json({
                success:true,
                data: {user: user},
            })
        })
        .catch(err => handleError(res, err, req.uuid, 'users.controller@getUserById --> '))
}


module.exports = {
    getUserById
};

