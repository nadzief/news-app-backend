//example of pool connection
const pool = require('../dbconnection')

// insert berita
const storeN = (payload) => { 
    return pool.query("INSERT INTO tb_berita(id, title, content, category, author, images, link_image, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", payload)
}

// get berita
const getN = (payload) => { 
    return pool.query("SELECT id, title, content, category, author, images, link_image, status, created_date, updated_date, update_by FROM tb_berita ORDER BY created_date DESC", payload);
}

// get one berita
const getNOne = (payload) => { 
    return pool.query("SELECT id, title, content, category, author, images, link_image, status, created_date, updated_date, update_by FROM tb_berita ORDER BY created_date DESC LIMIT 1 ", payload);
}

// get three berita
const getNThree = (payload) => { 
    return pool.query("SELECT id, title, content, category, author, images, link_image, status, created_date, updated_date, update_by FROM tb_berita ORDER BY created_date DESC LIMIT 3 ", payload);
}

// edit berita
const editN = (payload) => { 
    return pool.query('UPDATE tb_berita SET (title, content, category, author, images, link_image, status, update_date, update_by) = (COALESCE($1, title), COALESCE($2, content), COALESCE($3, category), COALESCE($4, author), $5, $6, $7, now(), $8) WHERE id = $9', payload)
}

const editSN = (payload) => {
    return pool.query("UPDATE tb_berita SET status = $1 WHERE id = $2", payload)
}

const deleteN = (payload) => { 
    return pool.query("DELETE FROM tb_berita WHERE id = $1", payload)
}

module.exports = {
    'getN': getN,
    'getNOne': getNOne,
    'getNThree': getNThree,
    'storeN': storeN,
    'editN': editN,
    'editSN': editSN,
    'deleteN': deleteN,
}