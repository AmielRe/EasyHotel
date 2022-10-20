last_obj = null;;
tab      = "users";

$(document).ready(function (){
    getOrders();
    getRooms();
    getServices();
    getUsers();
});

$("#main_table").on("click", "td", function() {
    if ( last_obj != null ) {
        last_obj.replaceWith($(`<td>${last_obj.val()}</td>`))
    }

    var html = $(this).html();
    var input = $('<input type="text" class="form-control" />');
    input.val(html);
    $(this).replaceWith(input);
    last_obj = input;

   
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
        tab = "users";
    }
    else if (table == "orders" && !active) {
        // Disable active and enable for orders
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table active')
        $('#rooms').attr('class', 'nav-link link-table')
        $('#services').attr('class', 'nav-link link-table')
        // wait for orders model
        getOrders(fill_table=true)
        tab = "orders";
    }

    else if (table == "rooms" && !active) {
        // Disable active and enable for rooms
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table')
        $('#rooms').attr('class', 'nav-link link-table active')
        $('#services').attr('class', 'nav-link link-table')
        // wait for rooms model
        getRooms(fill_table=true)
        tab = "rooms";
    }

    else if (table == "services" && !active) {
        // Disable active and enable for services
        $('#users').attr('class', 'nav-link link-table')
        $('#orders').attr('class', 'nav-link link-table')
        $('#rooms').attr('class', 'nav-link link-table')
        $('#services').attr('class', 'nav-link link-table active')
        // wait for services model (like spa)
        getServices(fill_table=true)
        tab = "services";

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
        '<th scope="col">Role</th>' +
        '<th scope="col">Update</th>' +
        '<th scope="col">Delete</th></tr>'
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
                        '<td>' + users_lst[i]["role"] + '</td>' +
                        '<th style="cursor: pointer;"><a id='+ users_lst[i]['_id'] +' href="#" onclick="updateRow(this)"><i class="bi bi-save" style="margin-left: 13%;"></i></a></th>' +
                        '<th style="cursor: pointer;"><a id='+ users_lst[i]['_id'] +' href="#" onclick="deleteRow(this)"><i class="delete bi bi-trash3-fill" style="margin-left: 13%; color: rgb(212, 71, 71);"></i></a></th></tr>'
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
        '<th scope="col">Reserved</th>' + 
        '<th scope="col">Update</th>' +
        '<th scope="col">Delete</th></tr>'
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
                        '<td>' + room_list[i]["reserved"] + '</td>' +
                        '<th style="cursor: pointer;"><a id='+ room_list[i]['_id'] +' href="#" onclick="updateRow(this)"><i class="bi bi-save" style="margin-left: 13%;"></i></a></th>' +
                        '<th style="cursor: pointer;"><a id='+ room_list[i]['_id'] +' href="#" onclick="deleteRow(this)"><i class="delete bi bi-trash3-fill" style="margin-left: 13%; color: rgb(212, 71, 71);"></i></a></th></tr>'
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
        '<th scope="col">Dates</th>' +
        '<th scope="col">Update</th>' +
        '<th scope="col">Delete</th></tr>'
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
                        '<td>' + order_lst[i]["dates"] + '</td>' +
                        '<th style="cursor: pointer;"><a id='+ order_lst[i]['_id'] +' href="#" onclick="updateRow(this)"><i class="bi bi-save" style="margin-left: 13%;"></i></a></th>' +
                        '<th style="cursor: pointer;"><a id='+ order_lst[i]['_id'] +' href="#" onclick="deleteRow(this)"><i class="delete bi bi-trash3-fill" style="margin-left: 13%; color: rgb(212, 71, 71);"></i></a></th></tr>'
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
        '<th scope="col">Available</th>' +
        '<th scope="col">Update</th>' +
        '<th scope="col">Delete</th></tr>'
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
                        '<td>' + services_lst[i]["available"] + '</td>' +
                        '<th style="cursor: pointer;"><a id='+ services_lst[i]['_id'] +' href="#" onclick="updateRow(this)"><i class="bi bi-save" style="margin-left: 13%;"></i></a></th>' +
                        '<th style="cursor: pointer;"><a id='+ services_lst[i]['_id'] +' href="#" onclick="deleteRow(this)"><i class="delete bi bi-trash3-fill" style="margin-left: 13%; color: rgb(212, 71, 71);"></i></a></th></tr>'
                    );
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    });
}

function updateRow(obj) {
    // Replace left input with td back
    $(obj).parents("tr:first").children("input").replaceWith($(`<td>${$(obj).parents("tr:first").children("input").val()}</td>`))

    // Get all row data
    var tableData = $(obj).parents("tr:first").children("td").map(function() {
        return $(this).text();
    }).get();

    // Convert to json
    jsonData = { ...tableData };

    // Send PUT request to update
    $.ajax({
        type: 'PUT',
        url: `/${tab}/${obj.id}`,
        dataType : 'json',
        data: jsonData,
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log(err)
        }
    });
    
}

function deleteRow(obj) {

    $(obj).parents("tr:first").remove()

    $.ajax({
        type: 'DELETE',
        url: `/${tab}/${obj.id}`,
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log(err)
        }
    });
}