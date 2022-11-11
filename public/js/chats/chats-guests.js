const socket = io();

socket.emit('join', {"token": getCookie()})

errModal    = `<div id="statusModal" class="modal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title"></h5>
      <button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">           
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary close-popup" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>`

function getCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"jwt"}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$(document).ready(function (){
    getAllAdmins();

    // Click to send new msg
    $('.send').click(function() {
        sendMsg();
    });

    // Send new msg on Enter click
    $('.input-group > input').on('keypress', function (e) {
        if(e.which === 13){
           //Disable textbox to prevent multiple submit
           $(this).attr("disabled", "disabled");

           sendMsg();

           //Enable the textbox again if needed.
           $(this).removeAttr("disabled");
        }
  });

    // Click on the user
    $(document).on('click','.user',function () {
        $('#messages').empty();

        email = $(this).children($('div')).text();

        getMsg(email);

    });
        
});

function getMsg(email) {
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
                    <img src="../../images/chats/user.png" class="rounded-circle mr-1" width="40" height="40">
                    <div class="text-muted small text-nowrap mt-2"></div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    <div class="font-weight-bold mb-1">${messages[i].source}</div>
                    ${messages[i].content}
                </div>
            </div>`)
            };
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title").html("Error")
            $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
}

function sendMsg() {
    destination = $('.msgSender > strong').text();
    content = $('.input-group > input').val();

    // Append the new msg to the chat
    $('#messages').append(`<div class="chat-message-left pb-4">
    <div>
        <img src="../../images/chats/user.png" class="rounded-circle mr-1" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2"></div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">me</div>
        ${content}
    </div>
    </div>`);

    // Clear the input bar
    $('.input-group > input').val("");

    // Emit the msg to the other client
    socket.emit('newMessage', {
        "token": getCookie(),
        "destination":destination,
        "content":content  
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
                        <img src="../../images/chats/user.png" class="rounded-circle mr-1" width="40" height="40">
                        <div class="flex-grow-1 ml-3 user">
                            ${adminsList[i].fullName}
                        <div class="small"><span class="fas fa-circle chat-online"></span>${adminsList[i].email}</div>
                        </div>
                        
                    </div>
                </a>`)
            };
            
            // Set up first chat;
            getMsg(adminsList[0].email);
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title").html("Error")
            $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
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
        <img src="../../images/chats/user.png" class="rounded-circle mr-1" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2"></div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">${data.destination}</div>
        ${data.content}
    </div>
    </div>`)
});