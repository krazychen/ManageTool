module.exports=function(io){
    var app = require('express');
    var router = app.Router();

    /** message connection **/
    io.on('connection', function(socket){
        socket.on('chat message', function (data) {
            console.log("12321:"+data);
            io.emit('chat message', data);
        });
    });


    return router;
}