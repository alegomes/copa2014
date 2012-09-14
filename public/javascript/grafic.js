var SpGraph = {  
  init : function(){  
    SpGraph.graph = Raphael("graph", 400, 200);  
    SpGraph.graph.rect(0, 0, 390, 110, 10).attr("fill", "#000");  
  }  
}

window.onload = function () {  
  SpGraph.init();  
};
