$(() => {
    $('#deleteAllButton').click(function() {
        $('.cart-table').html('');
        $('.col').find('.col-suite-selected').toggleClass('col-suite-selected');
        $('.col').find('.col-exclusive-selected').toggleClass('col-exclusive-selected');
        $('.col').find('.col-family-selected').toggleClass('col-family-selected');
        $('.col').find('.col-standard-selected').toggleClass('col-standard-selected');
        $('.cart-total-sum').html(0);
    })

    $('.col').click(function() {
        if($(this).hasClass('col-nonactive')) {
            return;
        }

        if($(this).children().hasClass('col-suite-selected')) {
            $(this).children().toggleClass('col-suite-selected');
            $('.cart-table').find('.col-suite').parent().parent().hide();
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 100);
            return;
        } else if($(this).children().hasClass('col-exclusive-selected')) {
            $(this).children().toggleClass('col-exclusive-selected');
            $('.cart-table').find('.col-exclusive').parent().parent().hide();
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 80);
            return;
        } else if($(this).children().hasClass('col-family-selected')) {
            $(this).children().toggleClass('col-family-selected');
            $('.cart-table').find('.col-family').parent().parent().hide();
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 75);
            return;
        } else if($(this).children().hasClass('col-standard-selected')) {
            $(this).children().toggleClass('col-standard-selected');
            $('.cart-table').find('.col-standard').parent().parent().hide();
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 60);
            return;
        }

        let template = $('#cart-item-template').html()

        if($(this).children().hasClass('col-suite')) {
            template = template.replaceAll('{type}', "Suite")
            template = template.replaceAll('{colType}', "col-suite")
            template = template.replaceAll('{price}', "100")
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + 100);
            $(this).children().toggleClass('col-suite-selected');
        } else if ($(this).children().hasClass('col-exclusive')) {
            template = template.replaceAll('{type}', "Exclusive")
            template = template.replaceAll('{colType}', "col-exclusive")
            template = template.replaceAll('{price}', "80")
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + 80);
            $(this).children().toggleClass('col-exclusive-selected');
        } else if ($(this).children().hasClass('col-family')) {
            template = template.replaceAll('{type}', "Family")
            template = template.replaceAll('{colType}', "col-family")
            template = template.replaceAll('{price}', "75")
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + 75);
            $(this).children().toggleClass('col-family-selected');
        } else if ($(this).children().hasClass('col-standard')) {
            template = template.replaceAll('{type}', "Standard")
            template = template.replaceAll('{colType}', "col-standard")
            template = template.replaceAll('{price}', "60")
            $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) + 60);
            $(this).children().toggleClass('col-standard-selected');
        }

        $('.cart-table').append(template)

        /*$('#deleteButton').click(function() {
            if($(this).parent().parent().children().children().hasClass('col-suite')) {
                $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 100);
                $('.col').find('.col-suite-selected').first().toggleClass('col-suite-selected');
            } else if($(this).parent().parent().children().children().hasClass('col-exclusive')) {
                $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 80);
                $('.col').find('.col-exclusive-selected').first().toggleClass('col-exclusive-selected');
            } else if($(this).parent().parent().children().children().hasClass('col-family')) {
                $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 75);
                $('.col').find('.col-family-selected').first().toggleClass('col-family-selected');
            } else if($(this).parent().parent().children().children().hasClass('col-standard')) {
                $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 60);
                $('.col').find('.col-standard-selected').first().toggleClass('col-standard-selected');
            }

            $(this).parent().parent().hide();
        })*/
    })
})

function deleteItem(event) {
    if($(event).parent().parent().children().children().hasClass('col-suite')) {
        $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 100);
        $('.col').find('.col-suite-selected').first().toggleClass('col-suite-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-exclusive')) {
        $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 80);
        $('.col').find('.col-exclusive-selected').first().toggleClass('col-exclusive-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-family')) {
        $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 75);
        $('.col').find('.col-family-selected').first().toggleClass('col-family-selected');
    } else if($(event).parent().parent().children().children().hasClass('col-standard')) {
        $('.cart-total-sum').html(parseInt($('.cart-total-sum').html()) - 60);
        $('.col').find('.col-standard-selected').first().toggleClass('col-standard-selected');
    }

    $(event).parent().parent().hide();
}