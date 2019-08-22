const model = require('../../model/BeritaModel')
const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {

    const idBerita = req.params.id;

    (async () => {
        let srcPath = path.join(__dirname, '../../')
        const getImageName = await model.getSN(idBerita)
        if(getImageName.rows[0].images.length > 2){
            fs.unlink(`${srcPath}/assets/images/` + getImageName.rows[0].images, (err) => {
                if (err) throw err
            })
        }
        const deleteStatus = await model.deleteN([idBerita])

        switch (deleteStatus.rowCount) {
            case 0:
                res.status(404).send({
                    message: "Tidak ada artikel dengan id tersebut!"
                });
                break;
            default:
                res.send({
                    message: "Berhasil menghapus artikel !"
                });
                break;
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error deleting news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))
}