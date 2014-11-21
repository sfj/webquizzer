$(document).ready(function () {
    var socket = io.connect('http://localhost:3000');
    socket.on('update-msg', function (msg) {
        console.log(msg);
        var boks = document.getElementById('buzzboks');
        var username = $.trim(msg.data.split('@')[0]);
        var timestamp = $.trim(msg.data.split('@')[1]);
        $('#buzzboks').append(
            $('<div/>', { 'class': 'lineentry' }
            ).append(
                $('<div/>', { html: '<span>' + username + '</span><br />' + timestamp, 'class' : 'left' })
            ).append(
                $('<button/>', { text: '+' }).on('click', null, msg.data, addScore)
            ).append(
                $('<button/>', { text: '-' }).on('click', null, msg.data, subScore)
            ).append(
                $('<br/>')
            )
        );
        //boks.innerHTML += '<span>' + msg.data + '</span>' + '<button onclick="addScore('+msg.data+')">+</button>' + '<br />';
        socket.emit('conf', {});
        $('button').button();
    })
    function addScore(msgString) {
        var username = $.trim(msgString.data.split('@')[0]);
        console.log('adding points to ' + username);
        if ($('#score' + username).length > 0) {
            console.log('adding to existing score');
            var scoreElm = $('#score' + username).children()[1];
            scoreElm.innerHTML = parseInt(scoreElm.innerHTML) + 1;
        } else {
            console.log('adding new entry');
            $('#scoreboard').append(
                $('<div/>', { id: 'score' + username, 'class': 'lineentry'}).append(
                    $('<div/>', { text: username, 'class' : 'left' })
                ).append(
                    $('<div/>', { text: 1, 'class' : 'right' })
                )
            );
        }
    }
    function subScore(msgString) {
        var username = $.trim(msgString.data.split('@')[0]);
        console.log('subbing points from ' + username);
        if ($('#score' + username).length > 0) {
            console.log('subbing from existing score');
            var scoreElm = $('#score' + username).children()[1];
            scoreElm.innerHTML = parseInt(scoreElm.innerHTML) - 1;
        } else {
            console.log('adding new entry');
            $('#scoreboard').append(
                $('<div/>', { id: 'score' + username, 'class': 'lineentry' }).append(
                    $('<div/>', { text: username, 'class': 'left' })
                ).append(
                    $('<div/>', { text: -1, 'class': 'right' })
                )
            );
        }
    }
    $('#buzzreset').click(function () {
        $('#buzzboks').empty();
    })
    $('#gamereset').click(function () {
        $('#buzzboks').empty();
        $('#scoreboard').empty();
    })
});