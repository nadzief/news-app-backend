//example of pool connection
const pool = require('../dbconnection')

const storeRegister = (payload) => { //payload being a parameter that needed to run query, each $1 (parameter) is being represented by the payload respectively
    return pool.query("INSERT INTO tb_user(id, nama, email, username, password) VALUES($1, $2, $3, $4, $5)", payload)
}

const storeRegisterAdmin = (payload) => { //payload being a parameter that needed to run query, each $1 (parameter) is being represented by the payload respectively
    return pool.query("INSERT INTO tb_admin(id, nama, email, username, password) VALUES($1, $2, $3, $4, $5)", payload)
}

module.exports = {
    'storeRegister' : storeRegister,
    'storeRegisterAdmin' : storeRegisterAdmin,
}