$("#logoutButton").click(function(){
    $.ajax({
        type: 'GET',
        url: '/auth/logout',
        success: function(newHeader){
            $('#headerNav').html(newHeader);
        },
        error: function(err){
            console.log(err)
        }
    });
});