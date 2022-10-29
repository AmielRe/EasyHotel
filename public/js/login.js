$(".close-popup").click(function() {
    $(".modal-body").empty();
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
            $(".modal-title").html("Error")
            $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
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
            $(".modal-title").html("Success")
            $(".modal-body").append("<p>" + response.status + "</p>")
            $("#statusModal").modal('show');
        },
        error: function(err){
            $(".modal-title").html("Error")
            $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});


