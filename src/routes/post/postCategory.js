const model = require('../../model/ModelCategory');
const uuid = require('../../helper/utility');
const errLog = require('../../helper/logger').errorlog;
var sha1 = require('sha1')
const { validationResult } = require('express-validator/check') //for post

module.exports = (req, res) => {

    /**
     * check request params
     */
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.mapped());
    }
    const data = req.body;
    const date = new Date().getTime();
    
    const id = uuid.getIdV4();
    let nama_category = data.nama_category;
    
    (async () => {

        console.log(id, nama_category)

        await model.storeCategory([id, nama_category])

        res.send({
            message: "Berhasil menambahkan category"
        })

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error adding news", { 'err': e.message })
        res.status(500).send({ message: "Terjadi kesalahan pada system, hubungi andministrator!" })
    }))

}