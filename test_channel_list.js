/**
 * Created by gyp on 2016/7/21.
 */
var io = require('socket.io-client');
var Action = require('./action');
var socket = io.connect('http://localhost:1336');
var schedule = require('node-schedule');

socket.on('connect', function(){
    console.log('client connect');
    socket.emit(Action.channel_list);
    socket.on(Action.channel_list,function(data){
        console.log(data);
    })
});

