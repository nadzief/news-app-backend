const model = require('../../model/ModelUser');
const errLog = require('../../helper/logger').errorlog;
const url = require('url');

module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    const id = req.params.id || '';
    (async () => {

        //get single news based on ID
        if (id !== '') {
            let singleUser = await model.getOneUser(id);
            res.send(singleUser.rows)
        } else {
            let user = await model.getUser();
            res.send(user.rows)
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error getting user", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))
}