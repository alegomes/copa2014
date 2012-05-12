function pathSVG(radius,px,py,dx,dy) {

	// Para entender essa loucura, veja
	// http://raphaeljs.com/reference.html#Paper.path
	// http://www.w3.org/TR/SVG/paths.html#PathData

	var p = px + "," + py + " ";
	var r = radius + "," + radius + " ";
	var rotation = "0 ";
	var segment = "0,1 ";	
	var d = dx + "," + dy;
	var path = "M" + p + "a" + r + rotation + segment + d;
	return path;
}

function Aro(containerId, radius) {
	
	var thickness = 0.5*radius;
	
	var width = 2*radius + 2*thickness; // 2*raio + 2*largura da borda
	var height = width;
	
	var paper = Raphael(containerId, width, height);

	// direito superior e.g "M50,0 a50,50 0 0,1 50,50"
	var px = radius + thickness;
	var py = thickness;
	var dx = radius;
	var dy = radius;
	var c3 = paper.path(pathSVG(radius,px,py,dx,dy));
	
	// direito inferior e.g. "M100,50 a50,50 0 0,1 -50,50"
	var px = px + dx;
	var py = py + dy;
	var dx = -radius;
	var dy = radius;
	var c4 = paper.path(pathSVG(radius,px,py,dx,dy));

	// esquerdo superior e inferior e.g. "M50,100 a50,50 0 0,1 0,-100"	
	var px = px + dx;
	var py = py + dy;
	var dx = 0;
	var dy = -2*radius;
	var c5 = paper.path(pathSVG(radius,px,py,dx,dy));
	
	c3.attr("stroke-width", thickness);
	c3.attr("stroke", "#f00");
	c4.attr("stroke-width", thickness);
	c4.attr("stroke", "#00f");
	c5.attr("stroke-width", thickness);
	c5.attr("stroke", "#fa0");
}

function testes() {
		// x, y, w, h
		var paper = Raphael(10, 10, 3000, 3000);
		//var paper = Raphael("transporte", 3000, 3000);
		// x, y, raio
	//	var circle = paper.circle(150, 150, 100);
	//	circle.attr("fill", "#fff");
	//	circle.attr("stroke", "#f00");
	//	circle.attr("stroke-width", 20);

		paper.path("M0 100H600");
		paper.path("M0 200H600");
		paper.path("M0 300H600");
		paper.path("M100 0V600");
		paper.path("M200 0V600");
		paper.path("M300 0V600");

	//	paper.path("M0 50L500 200");
	//	paper.path("M200 0L200 500");
	//	var a = paper.path("M10 10A10 10 -30 0 1 50 -25 l 50 -25");
	//	paper.path("M200,200 H-150 a150,150 0 1,0 150,-150 z");
		var c1 = paper.path("M200,100 a100,100 0 0,1 100,100");
		var c2 = paper.path("M200,100 a100,100 0 1,0 100,100");
		c1.attr("stroke-width", 20);
		c1.attr("stroke", "#f00");
		c2.attr("stroke-width", 20);
		c2.attr("stroke", "#080");

		var c3 = paper.path("M500,100 a100,100 0 0,1 100,100");
		var c4 = paper.path("M600,200 a100,100 0 0,1 -100,100");
		var c5 = paper.path("M500,300 a100,100 0 0,1 0,-200");
		c3.attr("stroke-width", 40);
		c3.attr("stroke", "#f00");
		c4.attr("stroke-width", 40);
		c4.attr("stroke", "#00f");
		c5.attr("stroke-width", 40);
		c5.attr("stroke", "#fa0");
}


jQuery (function() {
	Aro("transporte", 50);
	//testes();
});