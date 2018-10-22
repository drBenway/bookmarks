const crypto = require('crypto');
const capture = require('capture-chrome');
const fs = require('fs');
const fsPromises = fs.promises;


let capture_screen = async function (target) {
  //console.log('capturing');
  return capture({
    url: target,
    width: 1024,
    height: 768
  });
};

let write_thumb = async function (path, screencap) {

  //console.log('writing');
  //console.log(path);
  //console.log(screencap);
  try {
    let write = await fsPromises.writeFile(`${__dirname}/../static/${path}`, screencap);
    return Promise.resolve({thumb: path});
  }
  catch (error) {
    //console.log('error writing file');
    //console.log(error);
    return Promise.reject({thumb: "thumb/default.png"});
  }
};


let screenshot = async function (url) {
  //console.log('setup');
  const target = url.toString();
  const crypt = crypto.randomBytes(20).toString('hex');
  const path = "thumb/" + crypt + ".png";
  //console.log('url ' + target + " path " + path);

  let screen = await capture_screen(target);
  let writento = await write_thumb(`${path}`, screen);
  console.log(writento);
  if (writento.thumb !== 'thumb/default.png') {
    console.log(writento);
    return Promise.resolve(writento);
  }
  else {
    return Promise.reject(writento);
  }


  /*.
    then(screenshot => {
      return new Promise(function (resolve, reject) {
        fs.writeFile("<filename.type>", data, '<file-encoding>', function (err) {
          if (err) reject(err);
          else resolve(data);
        });
      });
      try {
        console.log('writing file');
        fs.writeFileSync(`${__dirname}/../static/${path}`, screenshot);
        console.log('resolving promise');
        promise.resolve({thumb: path});
      }
      catch (e) {
        console.log('error: ' + e);
        promise.reject(Error("It broke"));
      }

    });*/


};
module.exports = screenshot;




