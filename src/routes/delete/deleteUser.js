const model = require('../../model/ModelUser')
const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {

    const idUser = req.params.id;

    (async () => {
        let srcPath = path.join(__dirname, '../../')
        const getImageName = await model.getOneUser(idUser)
        if(getImageName.rows[0].image.length > 2){
            fs.unlink(`${srcPath}/assets/images/` + getImageName.rows[0].image, (err) => {
                if (err) throw err
            })
        }
        const deleteStatus = await model.deleteUser([idUser])

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