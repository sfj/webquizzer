    var socket = io.connect('http://localhost:3000');
    socket.on('update-msg', function(msg) {
        console.log(msg);
        var boks = document.getElementById('testboks');
        boks.innerHTML += msg.data + '<br />';
        socket.emit('conf', {});
    })