/*
By Tristan Schorn.
Uses a lot of Mike Bostock's example code, but in particular his scatter plot example at: https://bl.ocks.org/mbostock/3887118
and his brush slider example here: https://bl.ocks.org/mbostock/6452972
*/


var margin = {top: 60, right: 30, bottom: 30, left: 40},
    width = 1280 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);
var timeRange = [2008,2009,2010,2011,2012,2013,2014];

var xTimeline = d3.scale.linear()
    .domain([2008, 2014])
    .range([0, 300])
    .clamp(true);

var marginTimeline = {topTL: 200, rightTL: 50, bottomTL: 200, leftTL: 50},
    widthTimeline = 960 - marginTimeline.leftTL - marginTimeline.rightTL,
    heightTimeline = 500 - marginTimeline.bottomTL - marginTimeline.topTL;

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
	//.tickPadding(100)
	.tickFormat(d3.format("$s"))
    .scale(x)
    .orient("bottom");

var noComma = d3.format('')(xAxis);

var xValue = function(d){return d.Country;}

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var yValue = function(d){return d.Dollar}

var animate = true;

var cValue = function(d) { return d.Continent;},
    color = d3.scale.category10();



var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var rect = d3.select("svg g rect");

var year;
var duration = 600;
var continentSelected = false;

var brush = d3.svg.brush()
	.x(xTimeline)
	.extent([0,0])
	.on("brush", brushed);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(920," + height / 1.5 + ")")
	.style("font-size", "14px")
    .call(d3.svg.axis()
      .scale(xTimeline)
      .orient("bottom")
	  .ticks(7)
	  .tickFormat(function(d){return d;})
      .tickSize(14)
      .tickPadding(12))
  .select(".domain")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = svg.append("g")
	.attr("class", "slider")
	.call(brush);

var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(920," + height / 1.5 + ")")
    .attr("r", 12);



function brushed(){
	//console.log(handle.x());
	var value = brush.extent()[0];
	if(d3.event.sourceEvent){
		value = x.invert(d3.mouse(this)[0] - 920);
		brush.extent([value, value]);
	}
  handle.attr("cx", x(value));

  d3.select("body")
	.transition()
	.duration(100)
	//.style("background-color", d3.hsl(value, .8, .8))
	var number = Math.floor(value/70);
	var number2 = Math.round(number / 10);
	//console.log(number2);

	if(number2 <= 5 && number2 > -100){
		handle.attr("cx", 0);
		update(2008);
	}
	if(number2 <= 14 && number2 > 5){
		handle.attr("cx", 50);
		update(2009);
	}
	if(number2 <= 23 && number2 > 14){
		handle.attr("cx", 100);
		update(2010);
	}
	if(number2 <= 33 && number2 > 23){
		handle.attr("cx", 150);
		update(2011);
	}
	if(number2 <= 42 && number2 > 33){
		handle.attr("cx", 200);
		update(2012);
	}
	if(number2 <= 52 && number2 > 42){
		handle.attr("cx", 250);
		update(2013);
	}
	if(number2 < 560 && number2 > 52){
		handle.attr("cx", 300);
		update(2014);
	}	
}

function update(year){
		
	svg.selectAll(".dot")
		.transition()
		.duration(duration)
		.delay(function(d,i){return i * 5;})
		.attr("cx", function(d){return x(interpolateX(d, year));})
		.attr("cy", function(d){return y(interpolateY(d, year));});
}

function interpolateX(d, inYear){
	if(inYear == 2014){
		//console.log("x 2014");
		return d.D2014;
	}
	if(inYear == 2013){
		//console.log("x 2013");
		return d.D2013;
	}
	if(inYear == 2012){
		//console.log("x 2012");
		return d.D2012;
	}
	if(inYear == 2011){
		//console.log("x 2011");
		return d.D2011;
	}
	if(inYear == 2010){
		//console.log("x 2010");
		return d.D2010;
	}
	if(inYear == 2009){
		//console.log("x 2009");	
		return d.D2009;
	}
	if(inYear == 2008){
		//console.log("x 2008");
		return d.D2008;
	}
}

function interpolateY(d, inYear){
	if(inYear == 2014){
		//console.log("y 2014");
		return d.P2014;
	}
	if(inYear == 2013){
		//console.log("y 2013");
		return d.P2013;
	}
	if(inYear == 2012){
		//console.log("y 2012");
		return d.P2012;
	}
	if(inYear == 2011){
		//console.log("y 2011");
		return d.P2011;
	}
	if(inYear == 2010){
		//console.log("y 2010");
		return d.P2010;
	}
	if(inYear == 2009){
		//console.log("y 2009");
		return d.P2009;
	}
	if(inYear == 2008){
		//console.log("y 2008");
		return d.P2008;
	}
}

svg.append("svg:path")
	.attr("d","M 0 343.5 L 1220 340")
	.style("stroke-dasharray", (3,3))
	.style("stroke-width", 3)
	.style("stroke", "steelblue")
	.style("fill", "none");

svg.append("text")
	  .attr("y", 330)
	  .attr("x", 954)
	  .style("font-size", "16px")
	  .style("fill", "steelblue")
	  .text("↑ More mobile phones than people ↑");

svg.append("text")
	  .attr("y", 360)
	  .attr("x", 950)
	  .style("font-size", "16px")
	  .style("fill", "steelblue")
	  .text("↓ Fewer mobile phones than people ↓");

main(year);

function main(year){
d3.csv("./finalDataSet.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.D2008 = +d.D2008;
	d.P2008 = +d.P2008;
	d.P2013 = +d.P2013;
	d.D2013 = +d.D2013;
	d.Country = d.Country;
	d.Continent = d.Continent;
  });


  x.domain(d3.extent(data, function(d) { return d.D2013; })).nice();
  y.domain(d3.extent(data, function(d) { return d.P2013; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
	  .style("font-size", "14px")
	  //.format("04d")
	 // xAxis.replace(",", "")
	  //console.log(xAxis)
	  
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -10)
      .style("text-anchor", "end")
	  .style("font-size", "14px")
      .text("GDP per capita");

  svg.append("g")
      .attr("class", "y axis")
	  .style("font-size", "14px")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
	  .style("font-size", "14px")
      .text("Mobile Phones per 100 people");

  svg.append("text")
	  .attr("y", -15)
	  .attr("x", 0)
	  .style("font-size", "34px")
	  .text("Connectivity vs Wealth");

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4.5)
	  .attr("opacity", 0.8)
      .attr("cx", function(d,i) {return x(d.D2008); }) //x(d.Country)
      .attr("cy", function(d) { return y(d.P2008); })
      .style("fill", function(d) { return color(cValue(d));})
	  .on("mouseover", function(d) {
          tooltip
			   .style("font-size", "14px")
			   .transition()
               .duration(400)
               .style("opacity", .9);
          tooltip.html(d["Country"])
               .style("left", (d3.event.pageX + 8) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", function(d) {	
		if (d.hovered === undefined) {
			d.hovered = false;
		}
		if(d.clicked == false || d.hovered == false){	
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);		
		}
      })


	  .on("click", function(d){
			if (d.clicked === undefined) {
				d.clicked = false;
			}
			d.clicked = !d.clicked;
			if (d.clicked == true) {
				console.log(d);
				d3.select(this)
					.transition()
					.duration(duration)
					.attr("r", 10.0);
			} if (d.clicked == false || continentSelected == true) {
				d3.select(this)
					.transition()
					.duration(duration)
					.attr("r", 4.5);
			}
		});

	function saturationSwitch(p){
		if("opacity" ==0.5){
			return 1.0;}
		if("opacity" ==1.0){
			return 0.5;}
	}

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
	  .attr("cursor", "pointer")
      .attr("transform", function(d, i) { return "translate(0," + i * 38 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 36)
      .attr("height", 36)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 17)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
	  .style("font-size", "14px")
      .text(function(d) { 
				if(d == "NA"){
					return "North America";
				}
				if(d == "SA"){
					return "South America";
				}
				else{
					return d; 
				}
			});

  legend.on("click", function(d){
		console.log(d);

  legend.append("text")
      .attr("x", width + 17)
      .attr("y", 17)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
	  .style("font-size", "28px")
	  //.style("fill", "green")
      .text(function(b) { 
				if(b == d && continentSelected == false){
					 //d3.select(this).style("fill", "green")
					return "✔";
				}if(b == d && continentSelected == true){
					d3.select(this).style("fill", color).style("font-size", "54px").attr("x", width + 16).attr("y", 14)
					return "■";
				}if(b != d && continentSelected == true){
					d3.select(this).style("fill", color).style("font-size", "54px").attr("x", width + 16).attr("y", 14)
					return "■";
				}
			})

		//.text("fasdfasdfa")
		svg.selectAll(".dot")

			.transition()
			.duration(duration)
			.attr("r", function(a){
					if(a.Continent == d && continentSelected == false ){						
						return 10.0;
					}
					if(a.Continent == d && continentSelected == true ){						
						return 4.5;
					} else{
						return 4.5;
					}
				});
			continentSelected = !continentSelected;
		return;

	});

});
}
