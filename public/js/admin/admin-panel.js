$(document).ready(function (){
    getUsers()
});


$(".link-table").click(function() {
    var table = $(this).attr("id");
    if (table == "users") {
        getUsers()
    }
    else if (table == "orders") {

    }

    else if (table == "rooms") {
        
    }

    else if (table == "services") {
        
    }
});



function getUsers() {
    $.ajax({
        type: 'GET',
        url: '/users',
        success: function(users_lst){
            for (var i=0; i<users_lst.length; i++) {
                console.log(users_lst[i]);
                $('#main_table > tbody:last-child').append(
                    '<tr>' +
                    '<th scope="row">' + users_lst[i]['_id'] + '</th>' +
                    '<td>' + users_lst[i]["fullName"] + '</td>' +
                    '<td>' + users_lst[i]["email"] + '</td>' +
                    '<td>' + users_lst[i]["role"] + '</td></tr>'
                );
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}