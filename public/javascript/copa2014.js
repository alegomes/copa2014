jQuery(function() {
 // resources = DataHubApi.getResourceList("copa-2014");

	Copa2014.investimentosPorTema({
		onSuccess: function(json) {
      geraCirculo("aeroportos", json.aeroportos);
      geraCirculo("estadios", json.estádio);
      geraCirculo("hotelaria", json.hotelaria);
      geraCirculo("mobilidade", json.mobilidade);
      geraCirculo("portos", json.portos);
      geraCirculo("seguranca", json.segurança);
      // geraCirculo("telecomunicacoes", json.telecomunicações);
		},
		onError: function(xhr, message, error) {
			console.log("error: " + data);
		}
	});

});