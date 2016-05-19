module.exports=function(io){
    var app = require('express');
    var router = app.Router();

    var userList=new Array();

    /** message connection **/
    io.on('connection', function(socket){

        var addedUser=false;

        socket.on('add user',function(username){
            if(addedUser) return;

            //to avoid duplicate username add in list;
            if(userList.indexOf(username)!=-1){
                return;
            }
            userList.push(username);
            addedUser=true;
            socket.username = username;

            //login inform
            //socket.emit('login',{userList:userList});
            console.log(userList);
            // echo globally (all clients) that a person has connected
            io.emit('user joined', {
                username: socket.username,
                userList:userList
            });
        })


        socket.on('chat message', function (msg) {
            io.emit('chat message', {
             username:socket.username,
             msg:msg
            });
        });
    });


    return router;
}