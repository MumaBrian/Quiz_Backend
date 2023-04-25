import express from "express"
const app = express();
// const logger = require("morgan");
const port = 8000;

// app.use(logger("dev"));

app.get("/", function (req, res) {
    res.send("Hello New World!");
});
// About page route
app.get("/about", function (req, res) {
    res.send("About this wiki");
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

class Server{
    public app: express.Application;
    constructor() {
        this.app = express();// same as line 2
        this.config();
    }
    public config() {
        this.app.set("port", port);
        app.get("/", function (req, res) {
        res.send("Hello New World!");
});
    }
    public start:void {
        app.listen(port, function () {
        console.log(`Example app listening on port ${port}!`);
});
    }
    
}
