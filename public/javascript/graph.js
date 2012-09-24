document.read = function () {
  var filler = {
  		fill: 'white',
  		cursor: 'pointer',
  		stroke: 'green',
  		'stroke-width': 4
  	}
  	var paper = Raphael('draw', 10, 1000, 0, 0);
  	var r = paper.rect(60, 60, 200, 20, 5);
  	r.attr(filler);

  	var l = paper.path('M0 0L10 50');
}