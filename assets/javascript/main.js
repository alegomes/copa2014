jQuery(function() {
	
	//Estadios
	var estadio = json_estadios[json_estadios.length-1];
	geraCirculo("estadios_circulo", {
		previsto: estadio["valor_previsto"],
		contratado: estadio["valor_contratado"],
		executado: estadio["valor_executado"]
	});
  geraGrafico("grafico_estadios", json_estadios);

  //Aeroportos
	var aeroporto = json_aeroportos[json_aeroportos.length-1];
	geraCirculo("aeroportos_circulo", {
		previsto: aeroporto["valor_previsto"],
		contratado: aeroporto["valor_contratado"],
		executado: aeroporto["valor_executado"]
	});
  geraGrafico("grafico_aeroportos", json_aeroportos);

	//Mobilidade Hurbana
	var mobilidade_urbana = json_mobilidade_urbana[json_mobilidade_urbana.length-1];
	geraCirculo("mobilidade_circulo", {
		previsto: mobilidade_urbana["valor_previsto"],
		contratado: mobilidade_urbana["valor_contratado"],
		executado: mobilidade_urbana["valor_executado"]
	});
  geraGrafico("grafico_mobilidade", json_mobilidade_urbana);

  //Desenvolvimento Turistico
	var desenvolvimento_turistico = json_desenvolvimento_turistico[json_desenvolvimento_turistico.length-1];
	geraCirculo("desenvolvimento_turistico_circulo", {
		previsto: desenvolvimento_turistico["valor_previsto"],
		contratado: desenvolvimento_turistico["valor_contratado"],
		executado: desenvolvimento_turistico["valor_executado"]
	});
  geraGrafico("grafico_desenvolvimento_turistico", json_desenvolvimento_turistico);

	//Segurança
	var seguranca = json_seguranca[json_seguranca.length-1];
	geraCirculo("seguranca_circulo", {
		previsto: seguranca["valor_previsto"],
		contratado: seguranca["valor_contratado"],
		executado: seguranca["valor_executado"]
	});
  geraGrafico("grafico_seguranca", json_seguranca);

  //Portos
	var porto = json_portos[json_portos.length-1];
	geraCirculo("portos_circulo", {
		previsto: porto["valor_previsto"],
		contratado: porto["valor_contratado"],
		executado: porto["valor_executado"]
	});
  geraGrafico("grafico_portos", json_portos);

});