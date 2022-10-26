$(() => {
    setTimeout(function() {
        $('#rateModal').modal();
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
            }
        });
    });
})