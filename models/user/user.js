var db = require('../../base/db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

User.prototype.save=function(callback){
    //要存入数据库的用户文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    var date = new Date();
    var saveSql="insert into user (name,email,password,regtime) values ('"+
        user.name+"','"+user.email+"','"+user.password+"','"+date.toLocaleString()+"')";
    console.info(saveSql);

    db.query(saveSql,function(err,rows){
        callback(err,createUserByResult(rows[0]));
    });
};

User.prototype.get=function(name,callback){
    var getSql="select * from user where name='"+name+"';";
    db.query(getSql,function(err,rows){
        callback(err,createUserByResult(rows[0]));
    });
};

User.prototype.checkUser=function(callback){
    var checkSql="select * from user where name='"+this.name+"';";
    db.query(checkSql,function(err,rows){
        callback(err,createUserByResult(rows[0]));
    });
}

function createUserByResult(result){
    if(result!=null) {
        var newUser = new User({
            name: result.name,
            password: result.password,
            email: result.email
        });
        return newUser;
    }
    return null;
}

module.exports =User;