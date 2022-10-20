$(document).ready(function (){
    $.ajax({
        type: 'GET',
        url: `/admin/roles/all`,
        success: function(roles){
            var count = 1;
            $.each(roles, function(i, obj) {
                //use obj.id and obj.name here, for example:
                $('#roles > tbody:last-child').append(
                    '<tr>' +
                    '<th scope="row">' + count + '</th>' +
                    '<td>' + i + '</td>' +
                    '<td>' + obj + '</td>'
                );
                count += 1;
              });
        },
        error: function(err){
            console.log(err)
        }
    });

    $.ajax({
        type: 'GET',
        url: `/admin/roles/count`,
        success: function(stats){
            var totalData = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0
            }
            stats.forEach(element => {
                totalData[element["_id"]] = element["count"]
            });
            console.log(totalData)
            makeStatics(totalData)
            
        },
        error: function(err){
            console.log(err)
        }
    });

    
});


function makeStatics(totalData) {
    var ctxB = document.getElementById("entropyOfRoles").getContext('2d');
    var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
        labels: ["1", "2", "3", "4"],
        datasets: [{
        label: 'Roles stats',
        data: totalData,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }]
        },
        responsive: true,
        maintainAspectRatio: false
    }
    });
}
