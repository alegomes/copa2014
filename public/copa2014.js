function Wheel(containerId, radius, values) {
	
	var thickness = 0.2*radius;
	
	var width = 2*radius + 2*thickness;
	var height = width;
	
	var cx = width/2;
	var cy = height/2;
	
	var paper = Raphael(containerId, width, height);

	paper.piechart(cx, cy, radius, values);
	var circle = paper.circle(cx, cy, radius-thickness);
	circle.attr("fill", "#fff");
	circle.attr("stroke", "#fff");
}

jQuery (function() {
	Wheel("transporte", 100, [10,20,30]);
});