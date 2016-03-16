var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();
var donutChart = require('./donut_chart');
const svg2png = require("svg2png");

var getDonutChart = function (params, inner) {
  var chart = donutChart()
    // .data(params.data)
    // .width(params.width)
    // .height(params.height)
    // .xAxisLabel(params.xAxisLabel)
    // .yAxisLabel(params.yAxisLabel);


  d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

  var selector = params.containerId;
  var svgNode = d3.select(doc.getElementById(selector)).node();
  var svg = "";
  if (inner) {
    svg = svgNode.innerHTML;
    svg = svg.replace("<svg", '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0"');
  } else { 
    svg = svgNode.outerHTML;
  }
  d3.select(doc.getElementById(selector)).remove();
  return svg;
};

var getDonutChartImage = function (params, callback) {
  var svg = getDonutChart(params, true);
  const buf1 = new Buffer(svg);
  svg2png(buf1)
    .then(function(buffer){callback(null, buffer)})
    .catch(function(e){ console.trace(e); callback(e, null)});
}

module.exports = {
  getDonutChart: getDonutChart,
  getDonutChartImage: getDonutChartImage
};
