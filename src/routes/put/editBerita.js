const model = require('../../model/BeritaModel')
const { validationResult } = require('express-validator/check')
const errLog = require('../../helper/logger').errorlog;
const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {
    /**
     * check request params
    */

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json(errors.mapped())
    }

    const data = req.body;

    let nama_image = ''
    let new_image = req.files.map(photo => {
        // return {image: photo.originalname}
        nama_image =  photo.originalname
    })
    let srcPath = path.join(__dirname, `../../`)
    const link_old_image = data.link_image
    const old_image = nama_image
    let link_image = ''
    let images = ''
    console.log(old_image);
    if (new_image.length > 0) {
        // fs.unlink(`${srcPath}/assets/images/`+old_image, (err) => {
        //     if (err) throw err
        // })
        images = nama_image
        link_image = (`http://localhost:${process.env.SERVERPORT}/image/`+nama_image)
    }else{
        images = old_image
        link_image = link_old_image
    }

    // let namaImage = '';
    // let imageNames = req.files.map(photo => {
    //     // return {image: photo.originalname}
    //     // console.log(photo.originalname)
    //     namaImage = photo.originalname
    // });
    // let imageConvertToURL = `http://localhost:${process.env.SERVERPORT}/image/`+namaImage;

    const id = data.id;
    let title = data.title;
    let content = data.content;
    let category = data.category;
    let status_berita = data.status_berita;
    let update_by = 'SYS';
    
    (async () => {

        // console.log(title, content, category, status_berita, imageConvertToURL, namaImage, update_by, id)
        console.log(title, content, category, status_berita, link_image, images, update_by, id)

        // const { rowCount } = await model.editN([title, content, category, status_berita, imageConvertToURL, namaImage, update_by, id])
        const { rowCount } = await model.editN([title, content, category, status_berita, link_image, images, update_by, id])
        
        if (rowCount === 0) {
            res.status(404).send({
                message: "Tidak ada artikel dengan id tersebut!"
            })
        } else {
            res.send({
                message: "Berhasil mengubah artikel"
            })
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error editing news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))

}