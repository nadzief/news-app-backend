//example of pool connection
const pool = require('../dbconnection')

// insert berita
const storeCategory = (payload) => { 
    return pool.query("INSERT INTO tb_category(id, nama_category, created_date) VALUES($1, $2, now())", payload)
}

// get berita
const getCategory = (payload) => { 
    return pool.query("SELECT id, nama_category FROM tb_category ORDER BY created_date DESC", payload);
}

// get berita by id
const getSingleCategory = (id) => {
    return pool.query('SELECT id, nama_category, created_date, updated_date FROM tb_category WHERE id = $1', [id])
}

// edit berita
const editCategory = (payload) => { 
    return pool.query('UPDATE tb_category SET (nama_category, updated_date) = (COALESCE($1, nama_category), now()) WHERE id = $2', payload)
}

const deleteCategory = (payload) => { 
    return pool.query("DELETE FROM tb_category WHERE id = $1", payload)
}

module.exports = {
    'getCategory': getCategory,
    'getSingleCategory': getSingleCategory,
    'storeCategory': storeCategory,
    'editCategory': editCategory,
    'deleteCategory': deleteCategory,
}