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

$(document).ready(function (){
    $.ajax({
        type: 'GET',
        url: '/orders/getTakenRooms',
        dataType : 'json',
        data: {"checkInDate": $('#checkInDateInput').val(), "checkOutDate": $('#checkOutDateInput').val()},
        success: function(takenRoomsIds){
            // Get all rooms from DB
            setRooms(takenRoomsIds);
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
});

$(() => {
    $(document).ready ( function () {
        $(document).on ("click", ".col", function (event) {
            if($(this).hasClass('col-nonactive') || !$(event.target).is('div')) {
                return;
            }

            // If already chosen, remove it
            if($(this).children().hasClass('selected')) {
                $(this).children().toggleClass('selected');
                decreaseTotalSum(parseInt(this.getAttribute('data-price')))
                
                $('.cart-list').find('[data-col-type]:visible:first').parent().remove();
                return
            }

            let template = $('#cart-item-template').html()

            // If new selected - add it to cart
            $(this).children().toggleClass('selected');
            increaseTotalSum(parseInt(this.getAttribute('data-price')))
            template = template.replaceAll('{price}', this.getAttribute('data-price'))
            template = template.replaceAll('{colType}', this.getAttribute('data-col-type'))
            template = template.replaceAll('{type}', this.getAttribute('data-display-name'))
            template = template.replaceAll('{ids}', this.getAttribute('id'))

            $('.cart-list').append(template);

        });
    });

    $('.col').click(function(event) {
        
    })

    let exampleModal = document.getElementById('previewModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        let button = event.relatedTarget

        // Extract info from data-bs-* attributes
        let displayName = button.getAttribute('data-display-name')
        let informationText = button.getAttribute('data-information-text')
        let roomImages = button.getAttribute('data-room-images')
        const imagesArray = roomImages.split(',')
        
        // Update the modal's content.
        let modalTitle = exampleModal.querySelector('.modal-title')
        let modalBodyText = exampleModal.querySelector('.modal-body-text')

        modalTitle.textContent = displayName
        //modalBodyText.textContent = informationText

        $('.modal-body-text').html(informationText);


        let inc = 0;
        $('.carousel-item img').each(function(){
            
            $(this).attr('src',imagesArray[inc]);
            inc++;
        });
    })

    $("#checkoutBtn").click(function(){
        // Check whether cart is empty
        if(parseInt($('.cart-total-sum').html()) <= 0) {
            return false;
        }
    });
})

function deleteItem(event) {
    const priceToDecrease = parseInt(event.getAttribute("data-price"))
    decreaseTotalSum(priceToDecrease);
    $('.col').find('.' + event.getAttribute('data-col-type') + '.selected').first().toggleClass('selected');
    $(event).parent().remove()
}

function increaseTotalSum(priceToIncrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + priceToIncrease);
    $('.cart-items-counter').html(parseInt($('.cart-items-counter').html()) + 1);
}

function decreaseTotalSum(priceToDecrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - priceToDecrease);
    $('.cart-items-counter').html(parseInt($('.cart-items-counter').html()) - 1);
}


// Load all rooms from DB
function setRooms(takenRoomsIds) {
    $.ajax({
        type: 'GET',
        url: '/rooms',
        success: function(rooms){
            
            $.each(rooms, function(index, room) {
                if ( room["roomType"] == "Suite") {
                    // Checks if this room is taken
                    if (takenRoomsIds.indexOf(room['_id']) > -1) {
                        
                        $('.suite-area').append(`
                        <div class="col taken" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-suite" data-display-name="Suite">
                      
                        </div>`);
                    }
                    else {
                        $('.suite-area').append(`
                        <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-suite" data-display-name="Suite">
                      
                        </div>`);
                    }  
                }
                else if ( room["roomType"] == "Exclusive" ) {
                    // Checks if this room is taken
                    if (takenRoomsIds.indexOf(room['_id']) > -1) {
                        $('.exclusive-area').append(`
                    <div class="col taken" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-exclusive" data-display-name="Exclusive">
                  
                    </div>`);
                    }
                    else {
                        $('.exclusive-area').append(`
                        <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-exclusive" data-display-name="Exclusive">
                      
                        </div>`);
                    }
                    
                }
                else if ( room["roomType"] == "Family" ) {
                    // Checks if this room is taken
                    if (takenRoomsIds.indexOf(room['_id']) > -1) {
                        $('.family-area').append(`
                    <div class="col taken" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-family" data-display-name="Family">
                  
                    </div>`);
                    }

                    else {
                        $('.family-area').append(`
                        <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-family" data-display-name="Family">
                      
                        </div>`);
                    }
                    
                }
                else if ( room["roomType"] == "Standard" ) {
                    // Checks if this room is taken
                    if (takenRoomsIds.indexOf(room['_id']) > -1) {
                        $('.standard-area').append(`
                    <div class="col taken" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-standard" data-display-name="Standard">
                  
                    </div>`)
                    }

                    else {
                        $('.standard-area').append(`
                        <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-standard" data-display-name="Standard">
                      
                        </div>`)
                    }
                    
                }
            });
            $("div[data-col-type='col-suite']").load("html/suite-div.html")
            $("div[data-col-type='col-exclusive']").load("html/exclusive-div.html")
            $("div[data-col-type='col-family']").load("html/family-div.html")
            $("div[data-col-type='col-standard']").load("html/standard-div.html")
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
}