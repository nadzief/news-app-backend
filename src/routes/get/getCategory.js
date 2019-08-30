const model = require('../../model/ModelCategory');
const errLog = require('../../helper/logger').errorlog;
const url = require('url');

module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const id = req.params.id || '';
    (async () => {

        //get single news based on ID
        if (id !== '') {
            let singleCategory = await model.getSingleCategory(id);
            res.send(singleCategory.rows)
        } else {
            let category = await model.getCategory();
            res.send(category.rows)
        }

    })().catch(e => setImmediate(() => {
        console.log(e)
        errLog.error("Error getting news", { 'err': e.message })
        res.status(500).send({ message: "Something went wrong!" })
    }))

}