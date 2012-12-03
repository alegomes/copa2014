jQuery(function() {
	
	var cidade_sede = json_investimento_cidade_sede;
	var id = jQuery(".circulo").attr("id");
	geraCirculo(id, 204, 204, 89, 0, 102, 24, 4, 4, {
    previsto: cidade_sede["valor_previsto"] > 0 ? cidade_sede["valor_previsto"] : 1,
		contratado: cidade_sede["valor_contratado"],
		executado: cidade_sede["valor_executado"]
	});

  var investimentos_sede = jQuery(".investimentos_cidade_sede");
  jQuery(".previsto", investimentos_sede).text(formatFloatToString(cidade_sede["valor_previsto"]));
  jQuery(".contratado", investimentos_sede).text(formatFloatToString(cidade_sede["valor_contratado"]));
  jQuery(".executado", investimentos_sede).text(formatFloatToString(cidade_sede["valor_executado"]));

	for (var index in empreendimentos) {
  	var json = empreendimentos[index].json;
  	var empreendimento = jQuery("#"+empreendimentos[index].id);

  	var previsto = json["valor_previsto"];
  	var contratado = json["valor_contratado"];
  	var executado = json["valor_executado"];
  	var contratado_excedido = 0;
  	var executado_excedido = 0;

  	if (contratado > previsto) {
  		contratado_excedido = contratado - previsto;
      contratado = previsto;
  	}
  	if (executado > previsto) {
  		executado_excedido = executado - previsto;
      executado = previsto;
  	}

    jQuery(".previsto", empreendimento).text(formatFloatToString(previsto));
    jQuery(".contratado", empreendimento).text(formatFloatToString(json["valor_contratado"]));
    jQuery(".executado", empreendimento).text(formatFloatToString(json["valor_executado"]));

  	jQuery(".barra_contratado", empreendimento).css("width", formatPercent(contratado, previsto)+"%").attr("title", formatPercent(contratado, previsto)+"%");
  	jQuery(".barra_contratado_excedido", empreendimento).css("width", formatPercent(contratado_excedido, previsto)+"%").attr("title", formatPercent(contratado_excedido, previsto)+"%");  	
  	jQuery(".barra_executado", empreendimento).css("width", formatPercent(executado, previsto)+"%").attr("title", formatPercent(executado, previsto)+"%");
  	jQuery(".barra_executado_excedido", empreendimento).css("width", formatPercent(executado_excedido, previsto)+"%").attr("title", formatPercent(executado_excedido, previsto)+"%");
  }

});