/**
 * Created by gyp on 2016/7/20.
 */
var Action = require('./action');
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var rooms = new Array(3);
rooms[0]="a";
rooms[1]="b";
rooms[2]="c";
var join_room_sucess = "{'msg':'act_join_room','sucess':true}";
var join_room_fail = "{'msg':'act_join_room','sucess':false}";
//加入房间
var joinRoom = function (socket,roomName) {
    if(rooms.contains(roomName)){
        socket.join(roomName);
        socket.emit(Action.join_room,join_room_sucess);
        return true;
    }else {
        socket.emit(Action.join_room,join_room_fail);
        return false;
    }
}
//发送广播
var broadcast = function (socket,data){
    var obj = JSON.parse(data);
    socket.broadcast.in(obj.room).emit(Action.msg,data);
}

var getRoomList = function(socket,io){
    var json_obj = {
        list:new Array()
    };

    rooms.forEach(function(room){
        var obj = {
            name:room,
            count:0,
            des:''
        };
        var obj_room = io.sockets.adapter.rooms[room];
        if(typeof(obj_room) != 'undefined'){
            obj.count = obj_room.length;
        }
        json_obj.list.push(obj);
    });
    var json = JSON.stringify(json_obj);
    socket.emit(Action.channel_list,json);
    console.log(json);
}

var leaveRoom = function (socket,data){
    socket.leave(data);
}

exports.joinRoom = joinRoom;
exports.broadcast = broadcast;
exports.getRoomList = getRoomList;
exports.leaveRoom=leaveRoom;