jQuery(function() {
	
	jQuery.ajax({
		url: "/api/geral",
		dataType: "json",

		success: function(data) {
			for (index in data) {
				var json = data[index];
				var last = json[json.length-1];

				jQuery("#valor_previsto_"+index).text(formatFloatToString(last.valor_previsto));
				jQuery("#porcentagem_"+index+"_contratado").text(formatPercent(last.valor_contratado, last.valor_previsto));
				jQuery("#porcentagem_"+index+"_executado").text(formatPercent(last.valor_executado, last.valor_previsto));

				geraCirculo(index+"_circulo", 219, 219, 89, 6, 108, 24, 4, 4, {
					previsto: last.valor_previsto,
					contratado: last.valor_contratado,
					executado: last.valor_executado
				});
				if (json.length > 1) {
			  	geraGrafico("grafico_"+index, json);
				}
			}
		}
	});

});