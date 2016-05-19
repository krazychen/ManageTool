var express = require('express');
var router = express.Router();
var User=require('../models/user/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.url);
    console.log(req.session.user);
    if(req.session.user){
        res.render('index', {
            user: req.session.user
        });
    }else{
        res.render('login',{
            user: req.session.user,
            loginError:req.flash('loginError').toString(),
            regError:req.flash('reqError').toString()
        });
    }

});

module.exports = router;
