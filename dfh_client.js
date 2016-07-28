/**
 * Created by gyp on 2016/7/21.
 */
var io = require('socket.io-client');
var Action = require('./action');
var socket = io.connect('http://localhost:1337');
var schedule = require('node-schedule');
var rf=require("fs");
var data=rf.readFileSync('./dfh_data',"utf-8");
console.log(data);
var arr;
if (typeof data == 'string') {
    arr = data.split('/');
} else {
    arr = [];
}
console.log(arr);
socket.on('connect', function(){
    console.log('client connect');
    socket.emit(Action.join_room,'a');
    broadcastDFH(socket);
    socket.emit(Action.channel_list);
    socket.on(Action.channel_list,function(data){
        console.log(data);
    })
});

var broadcastDFH = function(socket){
    var rule = new schedule.RecurrenceRule();
    var times = [];

    for(var i=1; i<60; i++){

        times.push(i);

    }

    rule.second = times;
    var json_obj = {
        from:'dfh',
        room:'a',
        data:''
    };
    var c=0;
    var j = schedule.scheduleJob(rule, function(){
        console.log(arr[c]);
        json_obj.data = arr[c];
        socket.emit(Action.msg,JSON.stringify(json_obj));
        if(c===arr.length){
            c=0
        }else {
            c++;
        }

    });
}