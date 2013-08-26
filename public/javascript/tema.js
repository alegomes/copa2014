jQuery(function() {
	
	jQuery.ajax({
		url: "/api/tema/"+jQuery(".corpo").data("tema"),
		dataType: "json",

		success: function(data) {
			jQuery(".ultima-atualizacao .data").text(data.ultima_atualizacao);
			
			var investimento_tema = data.investimento_tema;
			var cidades_sede = data.cidades_sede;

			var id = jQuery(".circulo").attr("id");
			geraCirculo(id, 219, 219, 89, 6, 108, 24, 4, 4, {
		    previsto: data.investimento_tema.valor_previsto,
				contratado: data.investimento_tema.valor_contratado,
				executado: data.investimento_tema.valor_executado
			});

			for (var index in cidades_sede) {
				var id = index+"_circulo";
  			var json = cidades_sede[index];

  			if (index != "nacional" && json.valor_previsto > 0) {
  				geraCirculo(id, 110, 110, 40, 5, 53, 14, 4, 2, {
						previsto: json.valor_previsto,
						contratado: json.valor_contratado,
						executado: json.valor_executado
					});

					//Aplica tooltip em cada box de cidade sede
					var tema_info = jQuery("."+index+" .tema-info");

					var previsto = json.valor_previsto;
					var contratado = json.valor_contratado;
					var executado = json.valor_executado;
					
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

  			} else {
					jQuery("#"+id).hide();
				}
			}
		}
	});

});