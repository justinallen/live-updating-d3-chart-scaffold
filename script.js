
function buildChart(data) {
  console.log("building the chart");
  console.log(data);

  var margin = {
    top: 15,
    right: 25,
    bottom: 25,
    left: 120
  };
  var width = 760 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  var x = d3.scaleLinear().range([0, width]);

  // if svg already present, this will replace it
  d3.select("#barChart").remove();
  // append the svg object to the page
  // append a 'group' element to 'svg'
  // move the 'group' element to the top left margin
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.votes = +d.votes;
  });

  // Scale the range of the data in the domains
  x.domain([
    0,
    d3.max(data, function(d) {
      return d.votes;
    })
  ]);
  y.domain(
    data.map(function(d) {
      return d.name;
    })
  );
  // y.domain([0, d3.max(data, function(d) { return d.name; })]);

  // append the rectangles for the bar chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    // .attr("x", function(d) { return x(d.name); })
    .attr("width", function(d) {
      return x(d.votes);
    })
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth());

  // add the x Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    // .attr("class", "xAxis")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g").call(d3.axisLeft(y));
}

// utility functions for using Fetch API
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

// first call to fetch api and initial build of chart
// fetch('https://api.sos.ca.gov/returns/superintendent-of-public-instruction')
fetch("testdata.json")
  .then(status)
  .then(json)
  .then(function(data) {
    var choices = data.choices;
    console.log("Request succeeded with JSON response", choices);
    // initial build of chart
    buildChart(choices);
  })
  .catch(function(error) {
    console.log("Request failed", error);
  });

// Every so often check for data and update the graphic
d3.interval(function() {
  fetch("testdata.json")
    .then(status)
    .then(json)
    .then(function(data) {
      var choices = data.choices;
      console.log("Request succeeded with JSON response", choices);
      // re-render chart
//      buildChart(candidates);
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });

}, 10000);
