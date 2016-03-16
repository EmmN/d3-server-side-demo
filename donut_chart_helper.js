var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();
var donutChart = require('./donut_chart');


var getDonutChart = function (params) {

  var chart = donutChart()
    // .data(params.data)
    // .width(params.width)
    // .height(params.height)
    // .xAxisLabel(params.xAxisLabel)
    // .yAxisLabel(params.yAxisLabel);


  d3.select(doc.body).append('div').attr('id', params.containerId).call(chart);

  var selector = params.containerId;
  var svg = d3.select(doc.getElementById(selector)).node().outerHTML;
  d3.select(doc.getElementById(selector)).remove();

  return svg;

};


module.exports = {
  getDonutChart: getDonutChart
};
