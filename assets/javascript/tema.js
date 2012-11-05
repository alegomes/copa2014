jQuery(function() {
	
	var tema = json_investimentos;
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, {
    previsto: tema["valor_previsto"],
		contratado: tema["valor_contratado"],
		executado: tema["valor_executado"]
  });

  // for (var index in cidades_sede) {
  // 	var id = cidades_sede[index].name+"_circulo";
  // 	var json = cidades_sede[index].json;

  // 	console.log(id);
  // 	geraCirculo(id, {
	 //    previsto: json["valor_previsto"],
		// 	contratado: json["valor_contratado"],
		// 	executado: json["valor_executado"]
	 //  });
  // }

});