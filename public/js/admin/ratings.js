const votesArr = [
  {
    score: '1',
    value: 0
  },
  {
    score: '2',
    value: 0
  },
  {
    score: '3',
    value: 0
  },
  {
    score: '4',
    value: 0
  },
  {
    score: '5',
    value: 0
  }
];

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

max = 0

$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: `/rating`,
    success: function(ratings){
      console.log(ratings)
      $.each(ratings, function( key, value ) {
        votesArr[value["score"] - 1]["value"] += 1
      });
      max = Math.max(...votesArr.map(votesArr => votesArr.value));
      setGraph()
    },
    error: function(err){
      $('body').append(errModal);
      $(".modal-title").html("Error")
      $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
      $("#statusModal").modal('show');
    }
});
});

function setGraph() {
  const svg = d3.select('svg');
  const svgContainer = d3.select('#container');

  const margin = 80;
  const width = 700 - 2 * margin;
  const height = 500 - 2 * margin;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(votesArr.map((s) => s.score))
    .padding(0.3)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, max]);

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(votesArr)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.score))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth())
    .on('click', function(e) {
      $('#ratings').remove();
      currentScore = $(this)[0].__data__["score"];

      $.ajax({
        type: 'GET',
        url: `/rating/${currentScore}`,
        success: function(ratings){

          // Add the table 
          $("body").append(`
        <table class="table table-dark align-middle mb-0 bg-white" id="ratings">
        <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Score</th>
              <th scope="col">Comment</th>
          </tr>
      </thead>
        <tbody>
        </tbody>
      </table>
    `);
          // Add each comment to the table
          $.each(ratings, function(i, rating) {
            $('#ratings > tbody:last-child').append(`
              <tr><td>${i}</td>
              <td>${currentScore}</td>
              <td>${rating["comment"]}</td></tr>
            `);
          });
        
        },
        error: function(err){
          $('body').append(errModal);
          $(".modal-title").html("Error")
          $(".modal-body").append("<p>" + err["responseJSON"].error + "</p>")
          $("#statusModal").modal('show');
        }
    });
    })

  barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.score) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}`)

  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Number of guests')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Stars')

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Payment process ratings')

}