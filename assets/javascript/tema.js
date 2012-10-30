jQuery(function() {
	
	var tema = json[json.length-1];
	geraCirculo("estadios_circulo", {
    previsto: tema["valor_previsto"],
		contratado: tema["valor_contratado"],
		executado: tema["valor_executado"]
  });

});