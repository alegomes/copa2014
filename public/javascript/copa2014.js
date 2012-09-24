jQuery(function() {
	// resources = DataHubApi.getResourceList("copa-2014");
	// console.log(resources);

	Copa2014.investimentosPorTema(
		'http://thedatahub.org/api/data/ad90de8a-17c7-4576-a6a5-cc8c68b61f89',
		{onSuccess: function(json) {
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

	Copa2014.ultimosInvestimentosPorTema({
		onSuccess: function(json) {
			geraGrafico("grafico_estadios", json.estádio);
		},
		onError: function(xhr, message, error) {
			console.log("error: " + data);
		}
	});

});