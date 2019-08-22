const pool = require('../dbconnection')

const login = function(){};

login.prototype.loginUser = function(req, res, callback){
    var nowDate = new Date().toISOString().slice(0, 19).replace('T', ''),
        params = [req.body.username, req.body.password, 1],
        detailParams = [],
        updateParams = [],
        loginUserQuery = 'SELECT * FROM user WHERE username = ? AND password = ?',
        getDetailQuery = 'SELECT id, nama, email FROM user WHERE id = ?',
        updateLastLoginTime = 'UPDATE user SET lastLogin = ? WHERE id = ?';
    
    pool.getConnection(function(err, connection){
        connection.query(loginUserQuery, params, function(err, rows, fields){
            if(rows.length <= 0){
                connection.release();
                callback(true, null);
            } else {
                updateParams = [nowDate, rows[0].id];
                detailParams = [rows[0].id];
                req.session.user = rows[0];
                connection.query(updateLastLoginTime, updateParams, function(err, rows, field){
                    connection.query(getDetailQuery, detailParams, function(err, rows, field){
                        connection.release();
                        callback(null, rows[0]);
                    });
                });
            }
        });
    });
}

module.exports = new login();