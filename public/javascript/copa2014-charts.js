function Wheel(containerId, radius, values) {

	var thickness = 0.2 * radius;

	var width = 2 * radius + 2 * thickness;
	var height = width;

	var cx = width / 2;
	var cy = height / 2;

	var paper = Raphael(containerId, width, height);

	var pie = paper.piechart(cx, cy, radius, values, {
		colors: ["#FFB300", "#F74040", "#75E075"]
	});
	pie.click(function(a, b) {
		alert('Clicou em ' + containerId);
	})

	var circle = paper.circle(cx, cy, radius - thickness);
	circle.attr("fill", "#fff");
	circle.attr("stroke", "#fff");
}

