var express = require('express');
var crypto = require('crypto');
var User=require('../models/user/user');
var router = express.Router();

router.post('/reg', function(req, res, next) {

    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];

    console.log(password_re +":"+password);
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        req.flash('regError', '两次输入的密码不一致!');
        return res.redirect('/login');//返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    newUser.get(name,function(err,user){
        if(err){
            req.flash('regError', err);
            return res.redirect('/login');//注册失败返回主册页
        }
        if(user){
            req.flash('regError', '用户已存在!');
            return res.redirect('/login');//注册失败返回主册页
        }

        newUser.save(function (err, user) {
            if (err) {
                req.flash('regError', err);
                return res.redirect('/login');//注册失败返回主册页
            }
            req.session.user = user;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });

});

router.post('/in',function(req, res, next){
    var name = req.body.loginName,
        password = req.body.loginPassword;

    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.loginPassword).digest('hex');

    var loginUser=new User({
        name: req.body.loginName,
        password:password
    });

    loginUser.checkUser(function(err,user){
        if (err) {
            req.flash('loginError', err);
            return res.redirect('/login');//登录失败返回登录页
        }
        if(user==null) {
            req.flash('loginError', '用户不存在!');
            res.redirect('/login');//用户不存在
        }
        if(user.password!=password){
            req.flash('loginError', '密码错误!');
            return res.redirect('/login');//密码错误则跳转到登录页
        }
        req.session.user = user;//用户信息存入 session
        req.flash('success', '登录成功!');
        res.redirect('/');//注册成功后返回主页
    });
});

router.get('/logout',function(req, res, next){
    req.session.user=null;
    req.flash('success', '登出成功!');
    res.redirect('/');//退出成功返回主页
});


router.get('/',function(req, res, next){
    res.render('./login',{
        loginError:req.flash('loginError').toString(),
        regError:req.flash('regError').toString()
    });
});


module.exports = router;