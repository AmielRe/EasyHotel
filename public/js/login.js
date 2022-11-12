$(".close-popup").click(function() {
    $(".modal-body-status").empty();
    $("#statusModal").modal('hide');
});


$("#basic-auth-form").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
        type: 'POST',
        url: '/auth/basic',
        data: form.serialize(),
        success: function(response){
            document.location.href = response.redirect;
        },
        error: function(err){
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});


$("#add-user-form").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
        type: 'POST',
        url: '/users',
        data: form.serialize(),
        success: function(response){
            $(".modal-title-status").html("Success")
            $(".modal-body-status").append("<p>" + response.status + "</p>")
            $("#statusModal").modal('show');
        },
        error: function(err){
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});


