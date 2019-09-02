const model = require('../../model/ModelUser');
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
    
    let namaImage = ''
    let imageNames = req.files.map(photo => {
        // return {image: photo.originalname}
        // console.log(photo.originalname)
        namaImage = photo.originalname
    })
    let imageConvertToURL = `https://cryptic-mesa-74467.herokuapp.com/v1/image/`+namaImage
    // let imageConvertToURL = `http://localhost:${process.env.SERVERPORT}/v1/image/`+namaImage
    // let imageConvertToURL = `http://192.168.88.15:${process.env.SERVERPORT}/image/`+namaImage
    const id = uuid.getIdV4();
    let nama = data.nama;
    let email = data.email;
    let username = data.username;
    let password = data.password;
    
    (async () => {

        console.log(id, nama, email, username, password, namaImage, imageConvertToURL)

        await model.postUser([id, nama, email, username, password, namaImage, imageConvertToURL])

        res.send({
            message: "Berhasil menambahkan user"
        })

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error adding user", { 'err': e.message })
        res.status(500).send({ message: "Terjadi kesalahan pada system, hubungi andministrator!" })
    }))

}