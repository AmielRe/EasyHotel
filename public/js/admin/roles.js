$(document).ready(function (){
    $.ajax({
        type: 'GET',
        url: `/admin/roles/all`,
        success: function(roles){
            var count = 1;
            $.each(roles, function(i, obj) {
                console.log(i, obj)
                //use obj.id and obj.name here, for example:
                $('#roles > tbody:last-child').append(
                    '<tr>' +
                    '<th scope="row">' + count + '</th>' +
                    '<td>' + i + '</td>' +
                    '<td>' + obj + '</td>'
                );
                count += 1;
              });
        },
        error: function(err){
            console.log(err)
        }
    });
});