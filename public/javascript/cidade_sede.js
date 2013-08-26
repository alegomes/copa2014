jQuery(function() {
	
  jQuery.ajax({
    url: "/api/tema/"+jQuery(".corpo").data("tema")+"/cidade-sede/"+jQuery(".corpo").data("cidadeSede"),
    dataType: "json",

    success: function(data) {
      jQuery(".ultima-atualizacao .data").text(data.ultima_atualizacao);
      
      var investimento_cidade_sede = data.investimento_cidade_sede;
      var empreendimentos = data.empreendimentos;
      
      var id = jQuery(".circulo").attr("id");
      geraCirculo(id, 219, 219, 89, 6, 108, 24, 4, 4, {
        previsto: investimento_cidade_sede.valor_previsto > 0 ? investimento_cidade_sede.valor_previsto : 1,
        contratado: investimento_cidade_sede.valor_contratado,
        executado: investimento_cidade_sede.valor_executado
      });

      var investimentos_cidade_sede_div = jQuery(".investimentos_cidade_sede");
      jQuery(".previsto", investimentos_cidade_sede_div).text("R$ "+formatFloatToString(investimento_cidade_sede.valor_previsto));
      jQuery(".contratado", investimentos_cidade_sede_div).text("R$ "+formatFloatToString(investimento_cidade_sede.valor_contratado));
      jQuery(".executado", investimentos_cidade_sede_div).text("R$ "+formatFloatToString(investimento_cidade_sede.valor_executado));

      for (var index in empreendimentos) {
        var json = empreendimentos[index];
        var empreendimento = jQuery("#"+json.id);

        var previsto = json.valor_previsto;
        var contratado = json.valor_contratado;
        var executado = json.valor_executado;
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

        jQuery(".previsto", empreendimento).text("R$ "+formatFloatToString(previsto));
        jQuery(".contratado", empreendimento).text("R$ "+formatFloatToString(json.valor_contratado));
        jQuery(".executado", empreendimento).text("R$ "+formatFloatToString(json.valor_executado));

        jQuery(".barra_contratado", empreendimento).css("width", formatPercent(contratado, previsto)+"%").attr("title", formatPercent(contratado, previsto)+"%").html("<span>"+formatPercent(contratado, previsto)+"%</span>");
        jQuery(".barra_contratado_excedido", empreendimento).css("width", formatPercent(contratado_excedido, previsto)+"%").attr("title", formatPercent(contratado_excedido, previsto)+"%").html("<span>"+formatPercent(contratado_excedido, previsto)+"%</span>");
        jQuery(".barra_executado", empreendimento).css("width", formatPercent(executado, previsto)+"%").attr("title", formatPercent(executado, previsto)+"%").html("<span>"+formatPercent(executado, previsto)+"%</span>");
        jQuery(".barra_executado_excedido", empreendimento).css("width", formatPercent(executado_excedido, previsto)+"%").attr("title", formatPercent(executado_excedido, previsto)+"%").html("<span>"+formatPercent(executado_excedido, previsto)+"%</span>");
      }
    }
  });

});