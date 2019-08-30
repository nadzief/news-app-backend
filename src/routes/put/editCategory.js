const model = require('../../model/ModelCategory')
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
    
    const id = data.id;
    let nama_category = data.nama_category;
    
    (async () => {

        console.log(nama_category, id)

        const { rowCount } = await model.editCategory([nama_category, id])
        
        if (rowCount === 0) {
            res.status(404).send({
                message: "Tidak ada category dengan id tersebut!"
            })
        } else {
            res.send({
                message: "Berhasil mengubah category"
            })
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error editing news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))
}