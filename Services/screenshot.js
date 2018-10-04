const crypto = require('crypto');
const webshot = require('node-webshot');
let screenshot = function (url) {
        let target = url.toString();
        let crypt = crypto.randomBytes(20).toString('hex');
        let path = "thumb/" + crypt + ".png";
        console.log('url '+ target + " path " + path);
        webshot(target,path, function(err){});
        return {thumb: path};
};
module.exports = screenshot;
