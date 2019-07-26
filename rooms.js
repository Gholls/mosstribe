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
rooms[0]="东方红专区";
rooms[1]="余则成";
rooms[2]="冠希哥";
rooms[3]="阿娇";
rooms[4]="比景甜眼睛大的来";
rooms[5]="本APP代码已经遗失";
rooms[6]="服务器坚挺能用";
rooms[7]="www.gholl.com 实时弹幕";
rooms[8]="没错上面是广告";
rooms[9]="没有代码广告只能生加！！";
rooms[10]="www.gholl.com/photo 发个福利"
rooms[11]="就这样吧 欢迎光临！";
var join_room_sucess = "{'msg':'act_join_room','sucess':true}";
var join_room_fail = "{'msg':'act_join_room','sucess':false}";
//加入房间
var joinRoom = function (socket,roomName,io) {
    console.log(roomName);
    //if(rooms.contains(roomName)){
        socket.join(roomName);
        var join_room_sucess = {count:io.sockets.adapter.rooms[roomName].length};
        socket.emit(Action.join_room,join_room_sucess);
        var update={count:io.sockets.adapter.rooms[roomName].length}
        socket.broadcast.in(roomName).emit(Action.update,update);
        return true;
    //}else {
    //    socket.emit(Action.join_room,join_room_fail);
    //    return false;
   // }
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
