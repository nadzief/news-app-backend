const model = require('../../model/DaftarAnggotaModel');
const errLog = require('../../helper/logger').errorlog;
const url = require('url');

module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    let category = query.category || '';
    category = category.toUpperCase();
    let keyword = query.keyword || '';
    keyword = keyword.toUpperCase();
    let from = query.from || 0;
    const id = req.params.id || '';
    (async () => {

        //get single news based on ID
        if (id !== '') {
            let singleAnggota = await model.getSA(id);
            res.send(singleAnggota.rows)
            //get news based on query
        } else {
            let anggota = await model.getA();
            res.send(anggota.rows)
        }
    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error getting news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))

}