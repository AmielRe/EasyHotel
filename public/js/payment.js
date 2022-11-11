// Disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else {
            addUser();
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function checkPasswordMatch(input) {
  if (input.value != $('#password').val()) {
      input.setCustomValidity('Password Must be Matching.');
  } else {
      // input is valid -- reset the error message
      input.setCustomValidity('');
  }
}

function getFormData(form){
  var unindexed_array = form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function addUser() {
    orderForm = $('#order-form');

    formData = getFormData(orderForm);

    userData = {
      "fullName": formData.firstName + " " + formData.lastName,
      "email": formData.email,
      "password": formData.password
    }

    console.table(userData);

    $.ajax({
      type: 'POST',
      url: '/users',
      dataType : 'json',
      data: userData,
      success: function(response){
          console.log(response)
      },
      error: function(err){
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
        $('body').append(errModal);
        $(".modal-title").html("Error")
        $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
        $("#statusModal").modal('show');
      }
    });
}
  