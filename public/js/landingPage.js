$(() => {
    // Set minimum check in and check out dates
    var now = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    minCheckInDate = now.toISOString().substring(0,10);
    minCheckOutDate = tomorrow.toISOString().substring(0,10);
    $('#checkInDate').prop('min', minCheckInDate);
    $('#checkOutDate').prop('min', minCheckOutDate);
});