var socket = io();

socket.on('error', function(data) {
    alert("error")
})

$(document).ready(function () {
    error = document.getElementsByClassName("error");
    for (var i = 0; i < error.length; i++) {
        $(".modal-body").append("<p>" + error.item(i).value + "</p>")
     }

     if (error.length > 0) {
        $("#errorModal").modal('show');
     }
});

$(".close-popup").click(function() {
    $("#errorModal").modal('hide');
});