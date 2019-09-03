//example of pool connection
const pool = require('../dbconnection')

// insert berita
const storeN = (payload) => { 
    return pool.query("INSERT INTO tb_berita(id, title, content, id_category, author, images, link_image, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", payload)
}

// get berita
const getN = (payload) => { 
    return pool.query("SELECT B.id, B.title, B.content, B.id_category, C.nama_category, B.author, B.images, B.link_image, (CASE WHEN status = '0' THEN 'Aktif' ELSE 'Tidak Aktif' END) as status, B.created_date, B.updated_date, B.update_by FROM tb_berita AS B INNER JOIN tb_category AS C ON B.id_category = C.id ORDER BY B.created_date DESC", payload);
}

// get berita by id
const getSN = (id) => {
    return pool.query('SELECT B.id, B.title, B.content, B.id_category, C.nama_category, B.author, B.images, B.link_image, B.status, B.created_date, B.updated_date, B.update_by FROM tb_berita AS B INNER JOIN tb_category AS C ON B.id_category = C.id WHERE B.id = $1', [id])
}

// get one berita
const getNOne = (payload) => { 
    return pool.query("SELECT B.id, B.title, B.content, C.nama_category, B.author, B.images, B.link_image, B.status, B.created_date, B.updated_date, B.update_by FROM tb_berita AS B INNER JOIN tb_category AS C ON B.id_category = C.id ORDER BY B.created_date DESC LIMIT 1 ", payload);
}

// get three berita
const getNThree = (payload) => { 
    return pool.query("SELECT B.id, B.title, B.content, C.nama_category, B.author, B.images, B.link_image, B.status, B.created_date, B.updated_date, B.update_by FROM tb_berita AS B INNER JOIN tb_category AS C ON B.id_category = C.id ORDER BY B.created_date DESC LIMIT 3 ", payload);
}

// get berita by category
const getNewsCategory = (id_category) => {
    return pool.query("SELECT B.id, B.title, B.content, B.id_category, C.nama_category, B.author, B.images, B.link_image, B.status, B.created_date, B.updated_date, B.update_by FROM tb_berita AS B INNER JOIN tb_category AS C ON B.id_category = C.id WHERE B.id_category = $1", [id_category])
}

// edit berita
const editN = (payload) => { 
    return pool.query('UPDATE tb_berita SET (title, content, id_category, author, images, link_image, status, update_by) = (COALESCE($1, title), COALESCE($2, content), $3, COALESCE($4, author), $5, $6, $7, $8) WHERE id = $9', payload)
}

const editSN = (payload) => {
    return pool.query("UPDATE tb_berita SET status = $1 WHERE id = $2", payload)
}

const deleteN = (payload) => { 
    return pool.query("DELETE FROM tb_berita WHERE id = $1", payload)
}

module.exports = {
    'getN': getN,
    'getSN': getSN,
    'getNOne': getNOne,
    'getNThree': getNThree,
    'getNewsCategory': getNewsCategory,
    'storeN': storeN,
    'editN': editN,
    'editSN': editSN,
    'deleteN': deleteN,
}