const model = require('../../model/ModelRegister');
const uuid = require('../../helper/utility');
const errLog = require('../../helper/logger').errorlog;
const md5 = require('md5');
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
    const id = uuid.getIdV4();
    let nama = data.nama;
    let email = data.email;
    let username = data.username;
    let password = md5(data.password);
    
    (async () => {

        await model.storeRegisterAdmin([id, nama, email, username, password])

        res.send({
            message: "Registration Admin Success"
        })

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error Registration User", { 'err': e.message })
        res.status(500).send({ message: "Terjadi kesalahan pada system, hubungi andministrator!" })
    }))

}