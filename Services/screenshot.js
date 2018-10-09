const crypto = require('crypto');
//const webshot = require('node-webshot');
const capture = require('capture-phantomjs');
const fs = require('fs');
const util = require('util');

// Convert fs.writeFile into Promise version of same
const writeFile = util.promisify(fs.writeFile);

async function writeScreenshot(path, data) {
  return await writeFile(path, data);
}






let screenshot = function (url) {
        let target = url.toString();
        let crypt = crypto.randomBytes(20).toString('hex');
        let path = "thumb/" + crypt + ".png";

  capture({
    url: target,
    width: 400,
    height: 300
  }).then(screenshot => {
    console.log('screenshot for' + `static/${path}`);
    //fs.writeFileSync(`static/${path}`, screenshot);
    //await fs.writeFile(`static/${path}`, screenshot);
    writeScreenshot(`static/${path}`, screenshot)
      .then(()=>{
        let json = {thumb: `${path}`};
        return json;
      });

  })
    .catch(()=>{
      return {thumb: 'thumb/default.png'};
      }
    );


// make this return a promise


};
module.exports = screenshot;







