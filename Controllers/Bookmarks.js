module.exports = function(app, db, jsonParser) {

    var fields = ["EmployeeID", "LastName", "FirstName", "Title", "TitleOfCourtesy",
        "BirthDate", "HireDate", "Address", "City", "Region", "PostalCode",
        "Country", "HomePhone", "Extension"];

    console.log("Registering endpoint: /api/bookmarks");

    app.get('/api/bookmarks', function (req, res) {
        console.log("SELECT * FROM bookmarks");
        db.all("SELECT * FROM bookmarks", function (err, rows) {
            res.json(rows);
        });
    });

  app.post('/api/bookmarks',function(req,res){
    console.log(req.body);
    var user_url=req.body.url;
    var user_tags=req.body.tags.toString();
    var user_thumb = req.body.thumb;
    let query = `insert into bookmarks(url,thumb,tags) values ('${user_url}','${user_thumb}','${user_tags}')`;
    console.log(query);
    db.run(query);

    res.end("yes");
  });

};
