var io;
var express;

/*
 * GET users listing.
 */

exports.login = function (req, res) {
    res.render('login', {});
};

exports.buzz = function (req, res) {
    var logstring = req.body.username + ' @ ' + (new Date()).toUTCString();
    console.log(logstring);
    io.sockets.on('connection', function (socket) {
        //socket.emit('update-msg', { data: logstring });
        socket.on('conf', function (msg) {
            //console.log('Client received message');
        });
    });
    io.sockets.emit('update-msg', { data: logstring });
    res.render('login', {});
}

exports.init = function (app, ioin) {
    express = app;
    io = ioin;
}