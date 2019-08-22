//example of pool connection
const pool = require('../dbconnection')
const getPU = (payload) => {
    return pool.query('SELECT * FROM user WHERE username = $1 && password = $2');
}

const getFilterPU = (payload) => {
    return pool.query("SELECT PU.id as id_peserta, PU.no_identitas, PU.nama_peserta, PU.no_hp_peserta, (CASE WHEN PU.status_pembayaran = '0' THEN 'Belum Lunas' WHEN status_pembayaran = '1' THEN 'Lunas' END) status_pembayaran, PU.total_pembayaran, PU.no_referensi_pembayaran, JU.title_ujian,JU.biaya,JU.waktu_ujian FROM peserta_ujian AS PU INNER JOIN jadwal_ujian AS JU ON PU.id_jadwal_peserta = JU.id WHERE PU.id_jadwal_peserta = $1 ORDER BY PU.created_date DESC", payload);
}

const getSinglePU = (id) => {
    return pool.query("SELECT PU.id as id_peserta, PU.no_identitas, PU.nama_peserta, PU.no_hp_peserta, PU.status_pembayaran, PU.total_pembayaran, PU.id_jadwal_peserta, PU.email_peserta, PU.no_referensi_pembayaran, JU.title_ujian, JU.biaya, JU.waktu_ujian FROM peserta_ujian AS PU INNER JOIN jadwal_ujian AS JU ON PU.id_jadwal_peserta = JU.id WHERE PU.id = $1", [id]);
}

const storePU = (payload) => {
    return pool.query("INSERT INTO peserta_ujian(id, no_identitas, nama_peserta, email_peserta, no_hp_peserta, id_jadwal_peserta, total_pembayaran, status_pembayaran, no_referensi_pembayaran, created_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, now())", payload)
}
const editPU = (payload) => {
    return pool.query("UPDATE peserta_ujian SET (nama_peserta, email_peserta, no_hp_peserta, total_pembayaran, status_pembayaran, updated_date, updated_by) = ($1, $2, $3, $4, $5, now(), $6) WHERE id = $7", payload)
}
const deletePU = (payload) => {
    return pool.query("DELETE FROM peserta_ujian WHERE id = $1", payload)
}
module.exports = {
    'getPU': getPU,
    'getSinglePU': getSinglePU,
    'getFilterPU': getFilterPU,
    'storePU': storePU,
    'editPU': editPU,
    'deletePU': deletePU
}