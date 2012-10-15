jQuery(function() {
	// resources = DataHubApi.getResourceList("copa-2014");
	// console.log(resources);

	Copa2014.investimentosPorTema(
		'http://thedatahub.org/api/data/ad90de8a-17c7-4576-a6a5-cc8c68b61f89',
		{onSuccess: function(json) {
			geraCirculo("aeroportos_circulo", json.aeroportos);
			geraCirculo("estadios_circulo", json.estádio);
			geraCirculo("hotelaria_circulo", json.hotelaria);
			geraCirculo("mobilidade_circulo", json.mobilidade);
			geraCirculo("portos_circulo", json.portos);
			geraCirculo("seguranca_circulo", json.segurança);
			// geraCirculo("telecomunicacoes", json.telecomunicações);
			
			
			jQuery("#valor_estadio").html(json.estádio.previsto);
			jQuery("#valor_aeroportos").html(json.aeroportos.previsto);
			jQuery("#valor_mobilidade").html(json.mobilidade.previsto);
			jQuery("#valor_hotelaria").html(json.hotelaria.previsto);
      // jQuery("#valor_seguranca").html(json.seguranca.previsto);
      // jQuery("#valor_portos").html(json.portos.previsto);
		},
		onError: function(xhr, message, error) {
			console.log("error: " + data);
		}
	});
  geraGrafico("grafico_estadios","");
  geraGrafico("grafico_aeroportos",""); 
  geraGrafico("grafico_mobilidade",""); 
  geraGrafico("grafico_hotelaria",""); 
  geraGrafico("grafico_seguranca",""); 
  geraGrafico("grafico_portos","");   
  // Copa2014.ultimosInvestimentosPorTema({
  //  onSuccess: function(json) {
  //    geraGrafico("grafico_estadios", json.estádio);
  //  },
  //  onError: function(xhr, message, error) {
  //    console.log("error: " + data);
  //  }
  // });

});