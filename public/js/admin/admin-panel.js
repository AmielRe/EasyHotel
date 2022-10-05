$(document).ready(function (){
    getUsers();
    getOrders();
    getRooms();
    getServices();
});


$(".link-table").click(function() {
    var table = $(this).attr("id");
    var active = $(this).attr("class").indexOf("active") > 0;
    
    if (table == "users" && !active) {
        // Disable active and enable for users
        $('#users').attr('class', 'nav-link link-table active')
        $('#orders').attr('class', 'nav-link link-table')
        $('#rooms').attr('class', 'nav-link link-table')
        $('#services').attr('class', 'nav-link link-table')
        getUsers()
    }
    else if (table == "orders" && !active) {
        // Disable active and enable for orders
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table active')
        $('#rooms').attr('class', 'nav-link link-table')
        $('#services').attr('class', 'nav-link link-table')
        // wait for orders model
        getOrders(fill_table=true)
    }

    else if (table == "rooms" && !active) {
        // Disable active and enable for rooms
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table')
        $('#rooms').attr('class', 'nav-link link-table active')
        $('#services').attr('class', 'nav-link link-table')
        // wait for rooms model
        getRooms(fill_table=true)
    }

    else if (table == "services" && !active) {
        // Disable active and enable for services
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table')
        $('#rooms').attr('class', 'nav-link link-table')
        $('#services').attr('class', 'nav-link link-table active')
        // wait for services model (like spa)
        getServices(fill_table=true)

    }
});


function getUsers(fill_table=true) {
    $('#main_table > tbody').empty()
    $('#main_table > thead').empty()

    $('#main_table > thead').append(
        '<tr>' +
        '<th scope="col">id</th>' +
        '<th scope="col">Full Name</th>' +
        '<th scope="col">Email</th>' +
        '<th scope="col">Role</th></tr>'
    )
    $.ajax({
        type: 'GET',
        url: '/users',
        success: function(users_lst){
            $('#numberOfCustomers').html(users_lst.length)
            if ( fill_table ) {
                for (var i=0; i<users_lst.length; i++) {
                    $('#main_table > tbody:last-child').append(
                        '<tr>' +
                        '<th scope="row">' + users_lst[i]['_id'] + '</th>' +
                        '<td>' + users_lst[i]["fullName"] + '</td>' +
                        '<td>' + users_lst[i]["email"] + '</td>' +
                        '<td>' + users_lst[i]["role"] + '</td></tr>'
                    );
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}

function getRooms(fill_table=false) {
    $('#main_table > tbody').empty()
    $('#main_table > thead').empty()

    $('#main_table > thead').append(
        '<tr>' +
        '<th scope="col">id</th>' +
        '<th scope="col">Room Name</th>' +
        '<th scope="col">Price</th>' +
        '<th scope="col">Reserved</th></tr>'
    )
    $.ajax({
        type: 'GET',
        url: '/rooms',
        success: function(room_list){
            $('#numberOfRooms').html(room_list.length)
            if ( fill_table ) {
                for (var i=0; i<room_list.length; i++) {
                    $('#main_table > tbody:last-child').append(
                        '<tr>' +
                        '<th scope="row">' + room_list[i]['_id'] + '</th>' +
                        '<td>' + room_list[i]["name"] + '</td>' +
                        '<td>' + room_list[i]["price"] + '</td>' +
                        '<td>' + room_list[i]["reserved"] + '</td></tr>'
                    );
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}

function getOrders(fill_table=false) {
    $('#main_table > tbody').empty()
    $('#main_table > thead').empty()

    $('#main_table > thead').append(
        '<tr>' +
        '<th scope="col">id</th>' +
        '<th scope="col">Customer Name</th>' +
        '<th scope="col">Total Price</th>' +
        '<th scope="col">Dates</th></tr>'
    )

    $.ajax({
        type: 'GET',
        url: '/orders',
        success: function(order_lst){
            $('#numberOfOrders').html(order_lst.length)
            if( fill_table ) {
                for (var i=0; i<order_lst.length; i++) {
                    $('#main_table > tbody:last-child').append(
                        '<tr>' +
                        '<th scope="row">' + order_lst[i]['_id'] + '</th>' +
                        '<td>' + order_lst[i]["customer"] + '</td>' +
                        '<td>' + order_lst[i]["price"] + '</td>' +
                        '<td>' + order_lst[i]["dates"] + '</td></tr>'
                    );
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}

function getServices(fill_table=false) {
    $('#main_table > tbody').empty()
    $('#main_table > thead').empty()

    $('#main_table > thead').append(
        '<tr>' +
        '<th scope="col">id</th>' +
        '<th scope="col">Service Name</th>' +
        '<th scope="col">Price</th>' +
        '<th scope="col">Available</th></tr>'
    )

    $.ajax({
        type: 'GET',
        url: '/services',
        success: function(services_lst){
            $('#numberOfServices').html(services_lst.length)
            if ( fill_table ) {
                for (var i=0; i<services_lst.length; i++) {
                    $('#main_table > tbody:last-child').append(
                        '<tr>' +
                        '<th scope="row">' + services_lst[i]['_id'] + '</th>' +
                        '<td>' + services_lst[i]["service"] + '</td>' +
                        '<td>' + services_lst[i]["price"] + '</td>' +
                        '<td>' + services_lst[i]["available"] + '</td></tr>'
                    );
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}