var TheDataHub = {

	query: function() {

		var data = {
			query: {
				term: {
					Tema: 'aeroportos'
				}
			}
		};

		var q1 = {
			"query": {
				"match_all": {}
			}
		}

		var q2 = {
			"query": {
				"term": {
					//Tema: "aeroportos"
					'Cidade-Sede': "belo horizonte - mg"
				}
			}
		}

		var q3 = {
			"query": {
				"constant_score": {
					"filter": {
						"term": {
							// note that value should be *lower-cased*
							//Tema: "aeroportos"
							"Cidade-Sede": "belo horizonte*"
						}
					}
				}
			}
		}

		var q4 = {
			"query": {
				"filtered": {
					"query": {
						"match_all": {}
					},
					"filter": {
						"and": [{
							"term": {
								"Tema": "aeroportos"
							}
						},
						{
							"term": {
								"Cidade-Sede": "belo horizonte*"
							}
						}]
					}
				}
			}
		}
		
		var q5 = {
		    "query": {
		        "query_string": {
		            "query": "belo horizonte"
		        }
		    }
		}
		
		var q6 = {
			"query": {
			    "query_string" : {
			        "default_field" : "Tema",
			        "query" : "mobilidade"
			    }
			}
		}

		//http://thedatahub.org/api/data/4e256209-7e2d-4481-9627-da73e191baf2/_search?source="{query:{term:{Tema:Aeroportos}}}"	
		$.ajax({
			url: "http://thedatahub.org/api/data/4e256209-7e2d-4481-9627-da73e191baf2/_search?pretty=true",
			dataType: 'json',
			type: "GET",
			processData: false,
			data: "source="+JSON.stringify(q6),
			success: function(json, status, xhr) {
				console.log(status + ". " + json.hits.total + " registros encontrados.");
				console.log(json);
			},
			complete: function(xhr, status) {
				console.log("Fim do AJAX");
			},
			error: function(xhr, message, error) {
				console.log("Erro: " + error + " (" + message + ")");
			}
		});
	}
}



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

jQuery(function() {

	TheDataHub.query();
	return;

	Wheel("aeroportos", 100, [10, 20, 30]);
	Wheel("estadios", 100, [10, 25, 45]);
	Wheel("hotelaria", 100, [10, 25, 45]);
	Wheel("mobilidade", 100, [10, 25, 45]);
	Wheel("portos", 100, [10, 25, 45]);
	Wheel("seguranca", 100, [10, 25, 45]);
	Wheel("telecomunicacoes", 100, [10, 25, 45]);
});
