// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/html", express.static("./app/html"));

app.get("/", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/login.html", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/login.html", "utf8");
    res.send(doc);
});

app.get("/home.html", function (req, res) {

    let doc = fs.readFileSync("./app/html/home.html", "utf8");
    res.send(doc);

});

app.get("/list.html", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/list.html", "utf8");
    res.send(doc);
});

app.get("/information.html", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/information.html", "utf8");
    res.send(doc);
});

app.get("/post.html", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/makeAPost.html", "utf8");
    res.send(doc);
});

app.get("/profile.html", function (req, res) {

    let doc = fs.readFileSync("./app/html/profile.html", "utf8");
    res.send(doc);

});

app.get('/footer.html', (req, res) => {
    res.sendFile(__dirname + '/text/footer.html');
});

app.get('/navbar.html', (req, res) => {
    res.sendFile(__dirname + '/text/navbar.html');
});

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
