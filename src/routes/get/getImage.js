var http = require('http'),
    fs = require('fs'),
    url = require('url');
module.exports = (req, res) => {

    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url, true).query;
    pic = req.params.image;
    //read the image using fs and send the image content back in the response
    fs.readFile(`${__basedir}/assets/images/` + pic, function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
}