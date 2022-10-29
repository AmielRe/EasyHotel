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