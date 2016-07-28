/**
 * Created by gyp on 2016/7/15.
 */
var rooms = require('./rooms');
var Action = require('./action');
var io = require('socket.io').listen(1337);
io.sockets.on('connection', function (socket) {
    console.log("woca connection");
    socket.on(Action.join_room,function(data){
        rooms.joinRoom(socket,data);
    });

    socket.on(Action.msg,function (data){
       rooms.broadcast(socket,data);
    });

    socket.on(Action.channel_list,function (){
        rooms.getRoomList(socket,io);
    });

    socket.on(Action.channel_leave,function (data){
        rooms.leaveRoom(socket,data);
    });


    socket.on(Action.disconnect, function () {
        console.log("woca disconnect");
    });
});