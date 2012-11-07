jQuery(function() {
	
	var tema = json_investimento_tema;
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, 204, 204, 89, 102, 24, 4, {
    previsto: tema["valor_previsto"],
		contratado: tema["valor_contratado"],
		executado: tema["valor_executado"]
	});

  for (var index in cidades_sede) {
		var id = cidades_sede[index].name+"_circulo";
		var json = cidades_sede[index].json;

		console.log(cidades_sede[index].name);
		console.log(json);
		geraCirculo(id, 100, 100, 40, 51, 12, 2, {
			previsto: json["valor_previsto"],
			contratado: json["valor_contratado"],
			executado: json["valor_executado"]
		});
	}

});