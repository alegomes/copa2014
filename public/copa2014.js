jQuery(function() {
	
	Copa2014.investimentosPorTema({
		onSuccess: function(json) {
			console.log(json);
			Wheel("aeroportos", 100, [json.aeroportos.previsto, json.aeroportos.contratado, json.aeroportos.executado]);
			Wheel("estadios", 100, [json.estádio.previsto, json.estádio.contratado, json.estádio.executado]);
			Wheel("hotelaria", 100, [json.hotelaria.previsto, json.hotelaria.contratado, json.hotelaria.executado]);
			Wheel("mobilidade", 100, [json.mobilidade.previsto, json.mobilidade.contratado, json.mobilidade.executado]);
			Wheel("portos", 100, [json.portos.previsto, json.portos.contratado, json.portos.executado]);
			Wheel("seguranca", 100, [json.segurança.previsto, json.segurança.contratado, json.segurança.executado]);
			Wheel("telecomunicacoes", 100, [json.telecomunicações.previsto, json.telecomunicações.contratado, json.telecomunicações.executado]);
			
		},
		onError: function(xhr, message, error) {
			console.log("error: " + data);
		}
	})

/*	
	urbana - 188 
	mobilidade - 188 
	aeroportos - 65 
	segurança - 54 
	pública - 54 
	estádio - 50 
	arena - 50 
	portos - 21 
	hotelaria - 12
	telecomunicações - 8
*/

});