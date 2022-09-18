$(() => {
    $('#deleteAllButton').click(function() {
        clearCart();
    })

    $('.col').click(function() {
        if($(this).hasClass('col-nonactive')) {
            return;
        }

        // If already chosen, remove it
        if($(this).children().hasClass('selected')) {
            $(this).children().toggleClass('selected');
            decreaseTotalSum(parseInt(this.getAttribute('data-price')))
            $('.cart-table').find('.' + this.getAttribute('data-col-type') + ':visible:first').parent().parent().hide();
            return
        }

        let template = $('#cart-item-template').html()

        // If new selected - add it to cart
        $(this).children().toggleClass('selected');
        increaseTotalSum(parseInt(this.getAttribute('data-price')))
        template = template.replaceAll('{price}', this.getAttribute('data-price'))
        template = template.replaceAll('{colType}', this.getAttribute('data-col-type'))
        template = template.replaceAll('{type}', this.getAttribute('data-display-name'))

        $('.cart-table').append(template)
    })
})

function deleteItem(event) {
    const priceToDecrease = parseInt(event.getAttribute("data-price"))
    decreaseTotalSum(priceToDecrease);
    $('.col').find('.' + event.getAttribute('data-col-type') + '.selected').first().toggleClass('selected');
    $(event).parent().parent().hide();
}

function increaseTotalSum(priceToIncrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + priceToIncrease);
    $('.cart-items-counter').html(parseInt($('.cart-items-counter').html()) + 1);
}

function decreaseTotalSum(priceToDecrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - priceToDecrease);
    $('.cart-items-counter').html(parseInt($('.cart-items-counter').html()) - 1);
}

function clearCart() {
    $('.cart-table').html('');
    $('.col').find('.selected').toggleClass('selected')
    $('.cart-total-sum').html(0);
    $('.cart-items-counter').html(0);
}