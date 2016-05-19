$(function() {
    var username;
    var selectedUserName;
    var socket = io.connect('http://localhost:3000');

    //log in message
    function loginMessage(){
        //get current usernamae
        username=$("#username").text();
        $('.inputMessage').focus();
        // Tell the server your username
        socket.emit('add user', username);
    }

    function appendMessage(data){
        var $whoDiv;
        if(username==data.username){
            $whoDiv = $('<div class="who" style="color:green">').text(data.username);
        }else{
            $whoDiv = $('<div class="who" style="color:blue">').text(data.username);
        }
        var $whenDiv=$('<div class="when" >').text((new Date()).toLocaleString());
        var $headerDiv=$('<div class="messageHeader messageClearfix">').append($whoDiv).append($whenDiv);
        var $messageDiv =$('<div class="msg" >').text(data.msg);

        var $liItem =$('<li>').append($headerDiv).append($messageDiv);

        $('.messagesul').append($liItem);
        $('.messagesul')[0].scrollTop =$('.messagesul')[0].scrollHeight;
    }

    function sendMessage(event){
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $('.inputMessage').focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            socket.emit('chat message', $('.inputMessage').val());
            $('.inputMessage').val('');

        }
    }

    function refreshUserList(userList){
        $("#userList").empty();
        for(var i=0;i<userList.length;i++){
            var username=userList[i];
            var faWexin=$('<i class="fa fa-weixin">');
            var pItem=$('<p>').text("  "+username).prepend(faWexin);
            //var aItem=$('<a href="#" class="selectUser">').append(pItem);
            var liItem=$('<li id="'+username.trim()+'"'+' class="selectUser">').append(pItem);

            //add to userlist
            $("#userList").append(liItem);
        }
        // if selected user is not null, still selected user
        if(selectedUserName){
            $("#"+selectedUserName).css("background", "#bbbbbb");
        }
        registerUserSelectEvent();
    }

    function registerUserSelectEvent() {

        $(".selectUser").click(function (e) {
            $('.selectUser').css("background", "#f3f3f3");
            $(this).css("background", "#bbbbbb");

            //current selected user name
            selectedUserName=$(this).text().trim();
        });
    }

    $(window).keydown(function(event){sendMessage(event)});

    socket.on('user joined',function(msg){
        refreshUserList(msg.userList);
    });


    socket.on('chat message', function(msg){
        appendMessage(msg);
    });

    //tell server i have login
    loginMessage();
});