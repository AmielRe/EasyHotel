const socket = io();

socket.emit('join', {"token": getCookie()})

function getCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"jwt"}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$(document).ready(function (){
    getAllAdmins();

    $('.send').click(function() {
        destination = $('.msgSender > strong').text();
        content = $('.input-group > input').val();

        // Append the new msg to the chat
        $('#messages').append(`<div class="chat-message-left pb-4">
    <div>
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2"></div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">me</div>
        ${content}
    </div>
    </div>`)

        // Clear the input bar
        $('.input-group > input').val("");

        // Emit the msg to the other client
        socket.emit('newMessage', {
            "token": getCookie(),
            "destination":destination,
            "content":content  
        });
    });

    // Click on the user
    $(document).on('click','.user',function () {
        $('#messages').empty();

        email = $(this).children($('div')).text();
        // Clear privious chats
        $('.msgSender > strong').text(email);

        $.ajax({
            type: 'GET',
            url: `/chat/${email}`,
            success: function(messages){
                console.table(messages)
                for (var i=0; i<messages.length; i++) {
    
                    $('#messages').append(`<div class="chat-message-right pb-4">
                    <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                        <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                    </div>
                    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                        <div class="font-weight-bold mb-1">${messages[i].source}</div>
                        ${messages[i].content}
                    </div>
                </div>`)
                };
            },
            error: function(err){
                console.log(err)
            }
        });

    });
    
});

function getAllUserMessages() {
    $.ajax({
        type: 'GET',
        url: `/chat/`,
        success: function(messages){
            console.table(messages)
            for (var i=0; i<messages.length; i++) {

                $('#messages').append(`<div class="chat-message-right pb-4">
                <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">${messages[i].source}</div>
                    ${messages[i].content}
                </div>
            </div>`)
            };
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
        success: function(adminsList){
            // Load admins list
            for (var i=0; i<adminsList.length; i++) {
                $('#users').append(`<a id='${adminsList[i]._id}' href="#" class="list-group-item list-group-item-action border-0">
                    <div class="d-flex align-items-start">
                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40">
                        <div class="flex-grow-1 ml-3 user">
                            ${adminsList[i].fullName}
                        <div class="small"><span class="fas fa-circle chat-online"></span>${adminsList[i].email}</div>
                        </div>
                        
                    </div>
                </a>`)
            };
        },
        error: function(err){
            console.log(err)
        }
    });
}


socket.on('newMsg', function(data) {
    currentChat = $('.msgSender > strong').text();

    // User is on another chat
    if ( currentChat != data.source ) {
        return;
    } 

    // On new message
    $('#messages').append(`<div class="chat-message-left pb-4">
    <div>
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2">2:34 am</div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">${data.destination}</div>
        ${data.content}
    </div>
    </div>`)
});