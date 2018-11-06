# Live-updating D3 Chart Scaffold

![screenshot of chart](https://raw.githubusercontent.com/justinallen/live-updating-d3-chart-scaffold/master/img/screenshot.png)

An intentionally unsophisticated live-updating [D3](https://github.com/d3/d3) chart. It sidesteps the design pattern for merging your data and re-rendering elements in favor of a simple re-render of the entire chart on fetching new data. 

For quickly getting started without the data in a final form, this is something that worked for me. This will likely work best for simple charts that aren't updated too frequently, to prevent downtime of the chart during re-rendering; this isn't something I've tested. 

It's a mashup / intentional dumbing-down of two D3 blocks: this [general update pattern](https://bl.ocks.org/mbostock/3808218) and a [horizontal barchart](https://bl.ocks.org/caravinden/eb0e5a2b38c8815919290fa838c6b63b) written in Version 4 of D3.

