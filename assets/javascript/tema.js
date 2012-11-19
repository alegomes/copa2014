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

		geraCirculo(id, 110, 110, 40, 5, 53, 14, 4, 2, {
			previsto: json["valor_previsto"],
			contratado: json["valor_contratado"],
			executado: json["valor_executado"]
		});

		//Aplica tooltip em cada box de cidade sede
		var tema_info = jQuery("."+cidades_sede[index].name+" .tema-info");

		var previsto = json["valor_previsto"];
		var contratado = json["valor_contratado"];
		var executado = json["valor_executado"];
		
		if (contratado > previsto) {
			var extrapolado = contratado - previsto;
			contratado = previsto;
			jQuery(".contratado-extrapolado", tema_info).prepend(formatPercent(extrapolado, previsto));
    } else {
    	jQuery(".contratado-extrapolado", tema_info).hide();
    }
    if (executado > previsto) {
    	executado = previsto;
			var extrapolado = executado - previsto;
			jQuery(".executado-extrapolado", tema_info).prepend(formatPercent(extrapolado, previsto));
    } else {
    	jQuery(".executado-extrapolado", tema_info).hide();
    }
    jQuery(".contratado", tema_info).prepend(formatPercent(contratado, previsto));
		jQuery(".executado", tema_info).prepend(formatPercent(executado, previsto));
	}

});