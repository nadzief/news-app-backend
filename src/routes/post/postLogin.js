// const model = require('../../model/LoginsModel')
// const uuid = require('../../helper/utility')
// const errLog = require('../../helper/logger').errorlog
// const { validationResult } = require('express-validator/check') //for post

const connection = require('../../dbconnection')

module.exports.authenticate = function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query(' SELECT * FROM user WHERE username = ?', [username], function(error, results, fields){
        if(error) {
            res.json({
                status: false,
                message: 'failed login'
            })
        } else{
            if(result.length > 0){
                if(password == result[0].password){
                    res.json({
                        status: true,
                        message: 'success login'
                    })
                } else{
                    res.json({
                        status: false,
                        message: 'wrong username or password'
                    });
                }
            } else{
                res.json({
                    status: false,
                    message: 'username does not exists'
                });
            }
        }
    });
}