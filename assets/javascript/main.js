jQuery(function() {
	
	//Estadios
	var estadio = json_estadios[json_estadios.length-1];
	jQuery("#valor_previsto_estadio").text(formatFloatToString(estadio["valor_previsto"]));
	jQuery("#porcentagem_estadio_contratado").text(formatPercent(estadio["valor_contratado"], estadio["valor_previsto"]));
	jQuery("#porcentagem_estadio_executado").text(formatPercent(estadio["valor_executado"], estadio["valor_previsto"]));

	geraCirculo("estadio_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: estadio["valor_previsto"],
		contratado: estadio["valor_contratado"],
		executado: estadio["valor_executado"]
	});
  geraGrafico("grafico_estadios", json_estadios);

  //Aeroportos
	var aeroporto = json_aeroportos[json_aeroportos.length-1];
	jQuery("#valor_previsto_aeroportos").text(formatFloatToString(aeroporto["valor_previsto"]));
	jQuery("#porcentagem_aeroportos_contratado").text(formatPercent(aeroporto["valor_contratado"], aeroporto["valor_previsto"]));
	jQuery("#porcentagem_aeroportos_executado").text(formatPercent(aeroporto["valor_executado"], aeroporto["valor_previsto"]));

	geraCirculo("aeroporto_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: aeroporto["valor_previsto"],
		contratado: aeroporto["valor_contratado"],
		executado: aeroporto["valor_executado"]
	});
  geraGrafico("grafico_aeroportos", json_aeroportos);

	//Mobilidade Hurbana
	var mobilidade_urbana = json_mobilidade_urbana[json_mobilidade_urbana.length-1];
	jQuery("#valor_previsto_mobilidade").text(formatFloatToString(mobilidade_urbana["valor_previsto"]));
	jQuery("#porcentagem_mobilidade_contratado").text(formatPercent(mobilidade_urbana["valor_contratado"], mobilidade_urbana["valor_previsto"]));
	jQuery("#porcentagem_mobilidade_executado").text(formatPercent(mobilidade_urbana["valor_executado"], mobilidade_urbana["valor_previsto"]));

	geraCirculo("mobilidade_urbana_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: mobilidade_urbana["valor_previsto"],
		contratado: mobilidade_urbana["valor_contratado"],
		executado: mobilidade_urbana["valor_executado"]
	});
  geraGrafico("grafico_mobilidade", json_mobilidade_urbana);

  //Desenvolvimento Turistico
	var desenvolvimento_turistico = json_desenvolvimento_turistico[json_desenvolvimento_turistico.length-1];
	jQuery("#valor_previsto_desenvolvimento_turistico").text(formatFloatToString(desenvolvimento_turistico["valor_previsto"]));
	jQuery("#porcentagem_desenvolvimento_turistico_contratado").text(formatPercent(desenvolvimento_turistico["valor_contratado"], desenvolvimento_turistico["valor_previsto"]));
	jQuery("#porcentagem_desenvolvimento_turistico_executado").text(formatPercent(desenvolvimento_turistico["valor_executado"], desenvolvimento_turistico["valor_previsto"]));

	geraCirculo("desenvolvimento_turistico_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: desenvolvimento_turistico["valor_previsto"],
		contratado: desenvolvimento_turistico["valor_contratado"],
		executado: desenvolvimento_turistico["valor_executado"]
	});
  geraGrafico("grafico_desenvolvimento_turistico", json_desenvolvimento_turistico);

	//Segurança
	var seguranca = json_seguranca[json_seguranca.length-1];
	jQuery("#valor_previsto_seguranca").text(formatFloatToString(seguranca["valor_previsto"]));
	jQuery("#porcentagem_seguranca_contratado").text(formatPercent(seguranca["valor_contratado"], seguranca["valor_previsto"]));
	jQuery("#porcentagem_seguranca_executado").text(formatPercent(seguranca["valor_executado"], seguranca["valor_previsto"]));

	geraCirculo("seguranca_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: seguranca["valor_previsto"],
		contratado: seguranca["valor_contratado"],
		executado: seguranca["valor_executado"]
	});
  geraGrafico("grafico_seguranca", json_seguranca);

  //Portos
	var porto = json_portos[json_portos.length-1];
	jQuery("#valor_previsto_portos").text(formatFloatToString(porto["valor_previsto"]));
	jQuery("#porcentagem_portos_contratado").text(formatPercent(porto["valor_contratado"], porto["valor_previsto"]));
	jQuery("#porcentagem_portos_executado").text(formatPercent(porto["valor_executado"], porto["valor_previsto"]));

	geraCirculo("porto_circulo", 204, 204, 89, 0, 102, 24, 4, 4, {
		previsto: porto["valor_previsto"],
		contratado: porto["valor_contratado"],
		executado: porto["valor_executado"]
	});
  geraGrafico("grafico_portos", json_portos);

});