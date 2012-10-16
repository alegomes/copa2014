jQuery(function() {
	
	//Estadios
	var estadios = jQuery("#estadios");
	geraCirculo("estadios_circulo", {
		previsto: estadios.data("valorPrevisto"),
		contratado: estadios.data("valorContratado"),
		executado: estadios.data("valorExecutado")
	});
  geraGrafico("grafico_estadios","");

  //Aeroportos
	var aeroportos = jQuery("#aeroportos");
	geraCirculo("aeroportos_circulo", {
		previsto: aeroportos.data("valorPrevisto"),
		contratado: aeroportos.data("valorContratado"),
		executado: aeroportos.data("valorExecutado")
	});
  geraGrafico("grafico_aeroportos","");

	//Mobilidade Hurbana
	var mobilidade_urbana = jQuery("#mobilidade");
	geraCirculo("mobilidade_circulo", {
		previsto: mobilidade_urbana.data("valorPrevisto"),
		contratado: mobilidade_urbana.data("valorContratado"),
		executado: mobilidade_urbana.data("valorExecutado")
	});
  geraGrafico("grafico_mobilidade","");

  //Desenvolvimento Turistico
	var desenvolvimento_turistico = jQuery("#hotelaria");
	geraCirculo("hotelaria_circulo", {
		previsto: desenvolvimento_turistico.data("valorPrevisto"),
		contratado: desenvolvimento_turistico.data("valorContratado"),
		executado: desenvolvimento_turistico.data("valorExecutado")
	});
  geraGrafico("grafico_hotelaria","");

	//Segurança
	var seguranca = jQuery("#seguranca");
	geraCirculo("seguranca_circulo", {
		previsto: seguranca.data("valorPrevisto"),
		contratado: seguranca.data("valorContratado"),
		executado: seguranca.data("valorExecutado")
	});
  geraGrafico("grafico_seguranca","");

  //Portos
	var portos = jQuery("#portos");
	geraCirculo("portos_circulo", {
		previsto: portos.data("valorPrevisto"),
		contratado: portos.data("valorContratado"),
		executado: portos.data("valorExecutado")
	});
  geraGrafico("grafico_portos","");

});