jQuery(function() {
	
	var cidade_sede = json_investimento_cidade_sede;
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, 204, 204, 89, 0, 102, 24, 4, 4, {
    previsto: cidade_sede["valor_previsto"],
		contratado: cidade_sede["valor_contratado"],
		executado: cidade_sede["valor_executado"]
	});

});