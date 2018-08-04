var express = require("express");

var router = express.Router();


router.get('/', function (req, res) {
    res.redirect('/')
});

var burger = require("../models/burger.js");

//Gets data from database...
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name"
    ],
        [req.body.burger_name],
        function (result) {
            res.redirect("/");
        });
    
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        is_devoured: req.body.is_devoured
    }, condition, function (result) {
        res.redirect("/");
    });
});




module.exports = router;