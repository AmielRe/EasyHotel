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
          console.log(err)
      }
    });

}
  