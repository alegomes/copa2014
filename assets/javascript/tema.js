jQuery(function() {
	
	var tema = json[json.length-1];
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, {
    previsto: tema["valor_previsto"],
		contratado: tema["valor_contratado"],
		executado: tema["valor_executado"]
  });

});