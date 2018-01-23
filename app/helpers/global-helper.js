const logger = require('./logger');
const moment = require('moment');
const _ = require('lodash');
const httpStatus = require('http-status');


function handleError(res, err, uuid, customMessage)
{
    console.log('handled error', err);

    var uuid = uuid || null;
    var customMessage = customMessage || '';

    if(uuid)
        logger.file.error(customMessage+' '+err, uuid);

    if(err.name === 'MongoError' && err.code === 11000)
        return res.status(502).send({
            error: 'Record with such index(es) already exists at the DB',
            description:err.message,
        });

    let response = {
        error: err.message
    };

    if(customMessage)
        response.message = customMessage;

    let code = (httpStatus[err.code]) ? err.code : 500;

    res.status(code).send({response:response,description: err});
}


function send401response(res){
    res.status(401).json({"error":"user_id does not match with auth_key."})
}


function setErrorWithStatusCode(statusCode, message)
{
    return {
        error: message,
        statusCode: statusCode
    }
}


module.exports = {
    send401response,
    handleError,
    setErrorWithStatusCode
};