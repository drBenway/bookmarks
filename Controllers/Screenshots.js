let screenshotService = require('../Services/screenshot');
module.exports = function (app) {

  console.log("Registering endpoint: /api/screenshots");

  app.get('/api/screenshots', function (req, res) {
    let url = req.query.url;
    screenshotService(url).then(
      (data) => {
        console.log('ok send 200');
        console.log(data);
        res.json(data);
      },
      (error) => {
        console.log(error);
        res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
      }
    );
  });
};
