var copa = {
	
}
jQuery (function() {
	// x, y, w, h
	var paper = Raphael(10, 10, 3000, 3000);
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
});