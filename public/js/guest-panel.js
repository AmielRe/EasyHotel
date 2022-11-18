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
                url: '/users/getUser',
                data: { 
                    _id: info._id
                },
                success: function(user){            
                    $('#email').val(user.email)
                    $('#fullName').val(user.fullName)
                },
                error: function(err){
                }
            });
        },
        error: function(err){
        }
    });
});

$("#btnSaveChanges").click(function() {
    $.ajax({
        type: 'GET',
        url: '/auth/parseJWT',
        data: { 
            jwt: Cookies.get('jwt')
        },
        success: function(info){
            $.ajax({
                type: 'GET',
                url: '/users/getUser',
                data: { 
                    _id: info._id
                },
                success: function(user){            
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
                            
                        },
                        error: function(err){
                        }
                    });
                },
                error: function(err){
                }
            });
        },
        error: function(err){
        }
    });
});