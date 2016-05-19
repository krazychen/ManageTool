$(function() {
    var socket = io.connect('http://localhost:3000');
    socket.on('chat message', function(msg){
        appendMessage(msg);
    });


    function appendMessage(msg){
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(msg);
        var $messageDiv = $('<li class="message"/>')
            .append( $messageBodyDiv);
        $('.messages').append($messageDiv);
        $('.messages')[0].scrollTop =$('.messages')[0].scrollHeight;
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

    $("#chatSend").keydown(function(event){sendMessage(event)});
});