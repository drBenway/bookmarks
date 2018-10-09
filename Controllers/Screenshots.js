let screenshotService = require('../Services/screenshot');
module.exports = function(app) {

    console.log("Registering endpoint: /api/screenshots");

    app.get('/api/screenshots', function (req, res) {
        let url = req.query.url;
        res.json(screenshotService(url));

    });
};
