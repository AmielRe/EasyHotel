const socket = io();

socket.emit('join', {"token": getCookie()})

function getCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"jwt"}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$(document).ready(function (){
    msgList = getAllUserMessages();
    usersList = getAllAdmins();

    
});

function addNewMessage() {
    // send new message is socket.io
    socket.emit('newMessage', {"status":"works"})
}

function getAllUserMessages() {
    $.ajax({
        type: 'GET',
        url: `/chat/`,
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log(err)
        }
    });
}

function getAllAdmins() {
    $.ajax({
        type: 'GET',
        url: `/users/admins`,
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log(err)
        }
    });
}


socket.on('chat', function(data) {
    console.log(data["msg"])
});