var API_BASE = 'http://thedatahub.org/api/data/ad90de8a-17c7-4576-a6a5-cc8c68b61f89';
	
var Copa2014 = {

	registrosPorTema: function(callback) {
			
		var query = {
			"query":{"match_all":{}},"facets":{"temas":{"terms":{"field":"Tema"}}}
		}

		$.ajax({
			url: API_BASE + "/_search?pretty=true",
			dataType: "json",
			type: "GET",
			data: "source="+JSON.stringify(query),
			success: callback.onSuccess,
			error: callback.onError,
			complete: function() {console.log("AJAX completed")}
		});
	},
	
	investimentosPorTema: function(callback) {

		var query = {
			"query":{
				"match_all":{}
			},
			"facets":{
				"investimentos_previstos_por_tema":{
					"terms_stats":{
						"key_field":"Tema",
						"value_field":"Investimento-Previsto-para-a-Etapa"
					}
				},
				"investimentos_contratados_por_tema":{
					"terms_stats":{
						"key_field":"Tema",
						"value_field":"Investimento-Contratado-para-a-Etapa"
					}
				},
				"investimentos_executados_por_tema":{
					"terms_stats":{
						"key_field":"Tema",
						"value_field":"Investimento-Executado-para-a-Etapa"
					}
				}
			}
		}
		
		
		//http://thedatahub.org/api/data/ad90de8a-17c7-4576-a6a5-cc8c68b61f89/_search?pretty=true&source={"query":{"match_all":{}},"facets":{"investimentos_previstos_por_tema":{"terms_stats":{"key_field":"Tema","value_field":"Investimento-Previsto-para-a-Etapa"}},"investimentos_contratados_por_tema":{"terms_stats":{"key_field":"Tema","value_field":"Investimento-Contratado-para-a-Etapa"}},"investimentos_executados_por_tema":{"terms_stats":{"key_field":"Tema","value_field":"Investimento-Executado-para-a-Etapa"}}}}
		$.ajax({
			url: API_BASE + "/_search?pretty=true",
			dataType: 'json',
			type: "GET",
			processData: false,
			data: "source="+JSON.stringify(query),
			success: function(json) {
				var investimentos_previstos = {};
				for(var i in json.facets.investimentos_previstos_por_tema.terms) {
					var terms = json.facets.investimentos_previstos_por_tema.terms[i].term;
					var valor = json.facets.investimentos_previstos_por_tema.terms[i].total;
					investimentos_previstos[terms] = valor;
				}
				
				var investimentos_contratados = {};
				for(var i in json.facets.investimentos_contratados_por_tema.terms) {
					var terms = json.facets.investimentos_contratados_por_tema.terms[i].term;
					var valor = json.facets.investimentos_contratados_por_tema.terms[i].total;
					investimentos_contratados[terms] = valor;
				}
				
				var investimentos_executados = {};
				for(var i in json.facets.investimentos_executados_por_tema.terms) {
					var terms = json.facets.investimentos_executados_por_tema.terms[i].term;
					var valor = json.facets.investimentos_executados_por_tema.terms[i].total;
					investimentos_executados[terms] = valor;
				}
				
				var temas = ["mobilidade","urbana","aeroportos","segurança","pública","estádio","arena","portos","hotelaria","telecomunicações"];
				
				var investimentos = {}
				for(var i in temas) {
					var obj = {};
					var tema = temas[i];
					obj[tema] =	{
						"previsto" : investimentos_previstos[tema],
						"contratado" : investimentos_contratados[tema],
						"executado" : investimentos_executados[tema]
					};
					jQuery.extend(investimentos, obj);
				}
				callback.onSuccess(investimentos);
			},
			error: callback.onError,
			complete: function(xhr, status) {
				console.log("Fim do AJAX");
			}
		});
	}	
}
