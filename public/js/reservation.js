$(document).ready(function (){
    // Get all rooms from DB
    setRooms();
});

$(() => {
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

    $("div[data-col-type='col-suite']").load("html/suite-div.html")
    $("div[data-col-type='col-exclusive']").load("html/exclusive-div.html")
    $("div[data-col-type='col-family']").load("html/family-div.html")
    $("div[data-col-type='col-standard']").load("html/standard-div.html")
    
    // $.ajax({
    //     type: 'GET',
    //     url: '/orders/getTakenRooms',
    //     dataType : 'json',
    //     data: {"checkInDate": $('#checkInDateInput').val(), "checkOutDate": $('#checkOutDateInput').val()},
    //     success: function(response){
    //         for (const [roomType, count] of Object.entries(response)) {
    //             const matchedRoomTypes = $('div[data-display-name="' + roomType + '"]');
    //             for (let index = 0; index < count; ++index) {
    //                 matchedRoomTypes[index].classList.add("taken");
    //             }
    //         }
    //     },
    //     error: function(err){
    //         $('body').append(errModal);
    //         $(".modal-title-status").html("Error")
    //         $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
    //         $("#statusModal").modal('show');
    //     }
    // });

    $('.col').click(function(event) {
        if($(this).hasClass('col-nonactive')
           || !$(event.target).is('div')) {
            return;
        }

        // If already chosen, remove it
        if($(this).children().hasClass('selected')) {
            $(this).children().toggleClass('selected');
            decreaseTotalSum(parseInt(this.getAttribute('data-price')))
            console.log($('.cart-list').find('[data-col-type]:visible:first'))
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

        $('.cart-list').append(template)
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
            console.log(imagesArray[inc])
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
function setRooms() {
    $.ajax({
        type: 'GET',
        url: '/rooms',
        success: function(rooms){
            console.log(rooms);
            $.each(rooms, function(index, room) {
                if ( room["roomType"] == "Suite") {
                    $('.suite-area').append(`
                    <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-suite" data-display-name="Suite">
                  
                    </div>`);
                    $("div[data-col-type='col-suite']").load("html/suite-div.html")
                }
                else if ( room["roomType"] == "Exclusive" ) {
                    $('.exclusive-area').append(`
                    <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-exclusive" data-display-name="Exclusive">
                  
                    </div>`)
                    $("div[data-col-type='col-exclusive']").load("html/exclusive-div.html")
                }
                else if ( room["roomType"] == "Family" ) {
                    $('.family-area').append(`
                    <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-family" data-display-name="Family">
                  
                    </div>`)
                    $("div[data-col-type='col-family']").load("html/family-div.html")
                }
                else if ( room["roomType"] == "Standard" ) {
                    $('.standard-area').append(`
                    <div class="col" data-price="${room['cost']}" id="${room['_id']}" data-col-type="col-standard" data-display-name="Standard">
                  
                    </div>`)
                    $("div[data-col-type='col-standard']").load("html/standard-div.html")
                }
            });
        },
        error: function(err){
            $('body').append(errModal);
            $(".modal-title-status").html("Error")
            $(".modal-body-status").append("<p>" + err["responseJSON"].error + "</p>")
            $("#statusModal").modal('show');
        }
    });
}