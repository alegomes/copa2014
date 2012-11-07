jQuery(function() {
	
	var tema = json_investimento_tema;
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, 204, 204, 89, 0, 102, 24, 4, 4, {
    previsto: tema["valor_previsto"],
		contratado: tema["valor_contratado"],
		executado: tema["valor_executado"]
	});

  for (var index in cidades_sede) {
		var id = cidades_sede[index].name+"_circulo";
		var json = cidades_sede[index].json;

		geraCirculo(id, 102, 102, 40, 2, 51, 14, 4, 2, {
			previsto: json["valor_previsto"],
			contratado: json["valor_contratado"],
			executado: json["valor_executado"]
		});
	}

});