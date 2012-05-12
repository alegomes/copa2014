function pathSVG(r,px,py,dx,dy) {
	// Para entender essa loucura, veja
	// http://raphaeljs.com/reference.html#Paper.path
	// http://www.w3.org/TR/SVG/paths.html#PathData

	return [
		["M", px, py], 
		//["a", radius, radius, 0, 0, 1, dx, dy]
		["A", r, r, 0, 0, 1, dx, dy]
	];

	[
		["M", x, y], 
		["l", r * Math.cos(a1), r * Math.sin(a1)], 
		["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)], 
		["z"]
	]
	
}

function Wheel(containerId, radius, val1, val2, val3) {
	
	var thickness = 0.5*radius;
	
	var width = 2*radius + 2*thickness;
	var height = width;
	
	var paper = Raphael(containerId, width, height);

	// direito superior e.g "M50,0 a50,50 0 0,1 50,50"
	var px = radius + thickness;
	var py = thickness;
	//var dx = radius;
	//var dy = radius;
	var dx = px + radius * Math.cos(0);
	var dy = py + radius - (radius * Math.sin(0));
	
	var c1 = paper.path(pathSVG(radius,px,py,dx,dy));

	// direito inferior e.g. "M100,50 a50,50 0 0,1 -50,50"
	var px = dx;
	var py = dy;
	//var dx = -radius;
	//var dy = radius;
	dx = px - radius - (radius * Math.cos(-Math.PI/2));
	dy = py - (radius * Math.sin(3/2 * Math.PI));
	
	var c2 = paper.path(pathSVG(radius,px,py,dx,dy));

	// esquerdo superior e inferior e.g. "M50,100 a50,50 0 0,1 0,-100"	
	var px = dx;
	var py = dy;
	//var dx = 0;
	//var dy = -2*radius;
	dx = px - radius * Math.cos(Math.PI/2);
	dy = py - radius - (radius * Math.sin(Math.PI/2));
	
	var c3 = paper.path(pathSVG(radius,px,py,dx,dy));
	
	c1.attr("stroke-width", thickness);
	c1.attr("stroke", "#f00");
	c2.attr("stroke-width", thickness);
	c2.attr("stroke", "#00f");
	c3.attr("stroke-width", thickness);
	c3.attr("stroke", "#fa0");
}

jQuery (function() {
	Wheel("transporte", 50);
});