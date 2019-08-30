const model = require('../../model/ModelCategory')
const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {

    const id = req.params.id;

    (async () => {
        
        const deleteStatus = await model.deleteCategory([id])

        console.log(deleteStatus);
        switch (deleteStatus.rowCount) {
            case 0:
                res.status(404).send({
                    message: "Tidak ada Category dengan id tersebut!"
                });
                break;
            default:
                res.send({
                    message: "Berhasil menghapus Category !"
                });
                break;
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error deleting news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))
}