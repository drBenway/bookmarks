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
}