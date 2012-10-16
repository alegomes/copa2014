jQuery(function() {
	
	var paper = new Raphael ('clock',500,500);
  var circle = paper.circle(250,250,200);
  
  circle.node.id = "clock";
  circle.attr({
		stroke:"#f00"
  });

  var num = new Raphael(document.getElementById('clock'),400,400);
  var graydot = num.circle(10,100,5);
  
  graydot.attr({fill:"#000"});

});