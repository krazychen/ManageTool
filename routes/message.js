var express = require('express');
var router = express.Router();

router.get("/private",function(req, res, next) {
    console.log("private");
    res.render("./message/privatemes2",{});
});

module.exports=router;