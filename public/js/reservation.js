$(() => {
    $('#deleteAllButton').click(function() {
        clearCart();
    })

    $('.col').click(function() {
        if($(this).hasClass('col-nonactive')) {
            return;
        }

        if($(this).children().hasClass('col-suite-selected')) {
            $(this).children().toggleClass('col-suite-selected');
            $('.cart-table').find('.col-suite').parent().parent().hide();
            decreaseTotalSum(100)
            return;
        } else if($(this).children().hasClass('col-exclusive-selected')) {
            $(this).children().toggleClass('col-exclusive-selected');
            $('.cart-table').find('.col-exclusive').parent().parent().hide();
            decreaseTotalSum(80)
            return;
        } else if($(this).children().hasClass('col-family-selected')) {
            $(this).children().toggleClass('col-family-selected');
            $('.cart-table').find('.col-family').parent().parent().hide();
            decreaseTotalSum(75)
            return;
        } else if($(this).children().hasClass('col-standard-selected')) {
            $(this).children().toggleClass('col-standard-selected');
            $('.cart-table').find('.col-standard').parent().parent().hide();
            decreaseTotalSum(60)
            return;
        }

        let template = $('#cart-item-template').html()

        if($(this).children().hasClass('col-suite')) {
            template = template.replaceAll('{type}', "Suite")
            template = template.replaceAll('{colType}', "col-suite")
            template = template.replaceAll('{price}', "100")
            increaseTotalSum(100)
            $(this).children().toggleClass('col-suite-selected');
        } else if ($(this).children().hasClass('col-exclusive')) {
            template = template.replaceAll('{type}', "Exclusive")
            template = template.replaceAll('{colType}', "col-exclusive")
            template = template.replaceAll('{price}', "80")
            increaseTotalSum(80)
            $(this).children().toggleClass('col-exclusive-selected');
        } else if ($(this).children().hasClass('col-family')) {
            template = template.replaceAll('{type}', "Family")
            template = template.replaceAll('{colType}', "col-family")
            template = template.replaceAll('{price}', "75")
            increaseTotalSum(75)
            $(this).children().toggleClass('col-family-selected');
        } else if ($(this).children().hasClass('col-standard')) {
            template = template.replaceAll('{type}', "Standard")
            template = template.replaceAll('{colType}', "col-standard")
            template = template.replaceAll('{price}', "60")
            increaseTotalSum(60);
            $(this).children().toggleClass('col-standard-selected');
        }

        $('.cart-table').append(template)
    })
})

function deleteItem(event) {
    const priceToDecrease = parseInt(event.getAttribute("data-price"))

    if($(event).parent().parent().children().children().hasClass('col-suite')) {
        decreaseTotalSum(priceToDecrease);
        $('.col').find('.col-suite-selected').first().toggleClass('col-suite-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-exclusive')) {
        decreaseTotalSum(priceToDecrease)
        $('.col').find('.col-exclusive-selected').first().toggleClass('col-exclusive-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-family')) {
        decreaseTotalSum(priceToDecrease);
        $('.col').find('.col-family-selected').first().toggleClass('col-family-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-standard')) {
        decreaseTotalSum(priceToDecrease);
        $('.col').find('.col-standard-selected').first().toggleClass('col-standard-selected');
    }

    $(event).parent().parent().hide();
}

function increaseTotalSum(priceToIncrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + priceToIncrease);
}

function decreaseTotalSum(priceToDecrease) {
    $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - priceToDecrease);
}

function clearCart() {
    $('.cart-table').html('');
    $('.col').find('.col-suite-selected').toggleClass('col-suite-selected');
    $('.col').find('.col-exclusive-selected').toggleClass('col-exclusive-selected');
    $('.col').find('.col-family-selected').toggleClass('col-family-selected');
    $('.col').find('.col-standard-selected').toggleClass('col-standard-selected');
    $('.cart-total-sum').html(0);
}