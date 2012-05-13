function Wheel(containerId, radius, values) {
	
	var thickness = 0.2*radius;
	
	var width = 2*radius + 2*thickness;
	var height = width;
	
	var cx = width/2;
	var cy = height/2;
	
	var paper = Raphael(containerId, width, height);

	var pie = paper.piechart(cx, cy, radius, values, { colors: ["#FFB300", "#F74040", "#75E075"]});
	
	var circle = paper.circle(cx, cy, radius-thickness);
	circle.attr("fill", "#fff");
	circle.attr("stroke", "#fff");
}

jQuery (function() {
	Wheel("aeroportos", 100, [10,20,30]);
	Wheel("estadios", 100, [10,25,45]);
	Wheel("hotelaria", 100, [10,25,45]);
	Wheel("mobilidade", 100, [10,25,45]);
	Wheel("portos", 100, [10,25,45]);
	Wheel("seguranca", 100, [10,25,45]);
	Wheel("telecomunicacoes", 100, [10,25,45]);	
});