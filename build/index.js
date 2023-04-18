const express = require("express");
const app = express();
const logger = require("morgan");
const port = 8000;
app.use(logger("dev"));
app.get("/", function (req, res) {
    res.send("Hello World!");
});
// About page route
app.get("/about", function (req, res) {
    res.send("About this wiki");
});
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
