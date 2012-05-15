describe("Queries da Copa 2014", function() {

  it("deveria obter os valores previstos, contratados e executados", function() {
		var valoresPorTema = Copa2014.valoresPorTema();

		expect('mobilidade' in valoresPorTema).toBeTruthy();
		expect('telecomunicacoes' in valoresPorTema).toBeTruthy();
		expect('seguranca' in valoresPorTema).toBeTruthy();
		expect('estadio' in valoresPorTema).toBeTruthy();
		expect('hotelaria' in valoresPorTema).toBeTruthy();
		expect('portos' in valoresPorTema).toBeTruthy();
		
		expect('abacaxis' in valoresPorTema).not.toBeTruthy();
		
		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();

		expect('previsto' in valoresPorTema.aeroportos).toBeTruthy();
		expect('contratado' in valoresPorTema.aeroportos).toBeTruthy();
		expect('executado' in valoresPorTema.aeroportos).toBeTruthy();


  });
});