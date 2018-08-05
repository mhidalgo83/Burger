var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.PORT || 8080;

var app = express();


app.use(express.static("public"));


app.use(bodyParser.urlencoded( {extended: true}));


app.use(bodyParser.json());

app.use(methodOverride('_method'))
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs ({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controllers.js");
var burger = require("./models/burger.js");

app.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

app.use(routes);


app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: " + PORT)
});