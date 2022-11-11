$(() => {
    errModal    = `<div id="statusModal" class="modal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title"></h5>
      <button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">           
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary close-popup" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>`

    setTimeout(function() {
        $('#rateModal').modal('show');
    }, 2000);

    $("#sendRatingButton").click(function(){
        const messageText = $('#message-text').val();
        if(messageText.Length == 0) { 
            return;
        }

        // Get the full name from the confirmation box (split from "Full Name:" string)
        const fullName = $('#fullName').text().split(':')[1].substr(1);
        let stars = 0;
    
        if($('#star1').is(":checked")) {
            stars = 1;
        } else if($('#star2').is(":checked")) {
            stars = 2;
        } else if($('#star3').is(":checked")) {
            stars = 3;
        } else if($('#star4').is(":checked")) {
            stars = 4;
        } else if($('#star5').is(":checked")) {
            stars = 5;
        }

        // Update DB with new rating
        $.ajax({
            type: 'POST',
            url: '/rating',
            dataType : 'json',
            data: {
                score: stars,
                comment: messageText
            } ,
            success: function(response){
                $('#rateModal').modal('hide');
            },
            error: function(err){
                $('body').append(errModal);
                $(".modal-title").html("Error")
                $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
                $("#statusModal").modal('show');
            }
        });
    
        FB.init({
            appId      : '1529286150849787',
            status     : true,
            xfbml      : true,
            version    : 'v2.7'
          });

        $.ajax({
            type: 'GET',
            url: '/auth/access_token',
            success: function(access_token){
                FB.api(
                    '/102666259317559/feed',
                    'POST',
                    { "message": "New " + stars + " stars rating from " + fullName + "!" + "\r\n\"" + messageText + "\"", access_token: access_token.token },
                    function (response) {
                        if (response.error) {
                            console.log('error occurred: ' + response.error.message)
                            return;
                        }
                        console.log('successfully posted to page!');
                });
            },
            error: function(err){
                console.log(err)
                //$('body').append(errModal);
                //$(".modal-title").html("Error")
                //$(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
                //$("#statusModal").modal('show');
            }
        });
    });
})