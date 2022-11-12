errModal    = `<div id="statusModal" class="modal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title modal-title-status"></h5>
      <button type="button" class="close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body modal-body-status">           
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary close-popup" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>`

$("#logoutButton").click(function(){
    $.ajax({
        type: 'GET',
        url: '/auth/logout',
        success: function(newHeader){
            $('#headerNav').html(newHeader);
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});