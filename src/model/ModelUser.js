//example of pool connection
const pool = require('../dbconnection')

// get user
const getUser = (payload) => {
	return pool.query('SELECT * FROM tb_user ORDER BY created_date DESC', payload);
}

// get one user
const getOneUser = (id) => {
	return pool.query('SELECT * FROM tb_user WHERE id = $1', [id]);
}

// post User
const postUser = (payload) => {
	return pool.query('INSERT INTO tb_user(id, nama, email, username, password, image, link_image, created_date, updated_date) VALUES($1, $2, $3, $4, $5, $6, $7, now(), now())', payload);
}

// edit user
const editUser = (payload) => {
	return pool.query('UPDATE tb_user SET (nama, email, username, password, updated_date, image, link_image) = (COALESCE($1, nama), COALESCE($2, email), COALESCE($3, username), COALESCE($4, password), now(), $5, $6) WHERE id = $7', payload);
}

const deleteUser = (payload) => {
	return pool.query('DELETE FROM tb_user WHERE id = $1', payload);
}

module.exports = {
    'getUser': getUser,
    'getOneUser': getOneUser,
    'postUser': postUser,
    'editUser': editUser,
    'deleteUser': deleteUser
}