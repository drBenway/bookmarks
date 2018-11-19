module.exports = function(app, db, jsonParser) {


    console.log("Registering endpoint: /api/bookmarks");

    // get all bookmarks
    app.get('/api/bookmarks', function (req, res) {
        console.log("SELECT * FROM bookmarks");
        db.all("SELECT * FROM bookmarks", function (err, rows) {
            res.json(rows);
        });
    });

    // post a new bookmark
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

  // delete a bookmark
  app.delete('/api/bookmarks/:id',function(req,res){

    let id = req.params.id;
    console.log('deleting ' + id);
    let query = `delete from bookmarks where id like '${id}'`;

    db.run(query);
    res.end("done");
  });

};
