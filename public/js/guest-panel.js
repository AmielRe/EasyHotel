$(() => {
    $.ajax({
        type: 'GET',
        url: '/auth/parseJWT',
        data: { 
            jwt: Cookies.get('jwt')
        },
        success: function(info){       
            $.ajax({
                type: 'GET',
                url: `/users/getUser/${info._id}`,
                success: function(user){            
                    $('#email').val(user.email)
                    $('#fullName').val(user.fullName)
                },
                error: function(err){
                    $(".modal-title-status").html("Error")
                    $(".modal-body-status").html("<p>" + err["responseJSON"].error + "</p>")
                    $("#statusModal").modal('show');
                }
            });
        },
        error: function(err){
            $(".modal-title-status").html("Error")
            $(".modal-body-status").html("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});

$("#btnSaveChanges").click(function() {
    // Get parsed data from JWT
    $.ajax({
        type: 'GET',
        url: '/auth/parseJWT',
        success: function(info){
            
            // Get user info
            $.ajax({
                type: 'GET',
                url: `/users/getUser/${info._id}`,
                success: function(user){            

                    // Update the current user
                    $.ajax({
                        type: 'PUT',
                        url: `/users/${user._id}`,
                        dataType : 'json',
                        data: {
                            "0": $('#fullName').val(),
                            "1": $('#email').val(),
                            "2": user.role
                        },
                        success: function(res){
                            $(".modal-title-status").html("Success!")
                            $(".modal-body-status").html("<p>" + "User was updated successfully" + "</p>")
                            $("#statusModal").modal('show');
                        },
                        error: function(err){
                            $(".modal-title-status").html("Error")
                            $(".modal-body-status").html("<p>" + err["responseJSON"].error + "</p>")
                            $("#statusModal").modal('show');
                        }
                    });
                },
                error: function(err){
                    $(".modal-title-status").html("Error")
                    $(".modal-body-status").html("<p>" + err["responseJSON"].error + "</p>")
                    $("#statusModal").modal('show');
                }
            });
        },
        error: function(err){
            $(".modal-title-status").html("Error")
            $(".modal-body-status").html("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});