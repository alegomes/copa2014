describe("Queries da Copa 2014", function() {

//  var request;
//  var success, onFailure;

/*  beforeEach(function() {
	jasmine.Ajax.useMock();

	success = jasmine.createSpy('onSuccess');
    onFailure = jasmine.createSpy('onFailure');


	Copa2014.registrosPorTema({
      onSuccess: success,
      onFailure: onFailure
    });

    request = mostRecentAjaxRequest();

  });
*/
  describe("on success", function() {

/*
	beforeEach(function() {
      request.response(response_tema_facets);
    });

	it("calls onSuccess with an array of Locations", function() {
	      expect(success).toHaveBeenCalled();

	      var successArgs = onSuccess.mostRecentCall.args[0];

	      expect(successArgs.length).toEqual(1);
	      expect(successArgs[0]).toEqual(jasmine.any(Venue));
	    });
*/

	it("deveria obter a quantidade certa de registros", function() {
			var callback = jasmine.createSpy();
			
			Copa2014.registrosPorTema(callback);
			waitsFor(function() {
				return callback.callCount > 0;
			});
			runs(function() {
		        expect(callback).toHaveBeenCalled();
		    });

			registros_por_tema = {
				'aeroportos': 65,
				'estádio': 50,
				'hotelaria': 12, 
				'mobilidade': 188,
				'portos': 21,
				'segurança': 54,
				'telecomunicações': 8,
				'não vinculados': 1
			};

			for(i in registros_por_tema) {
				//alert('>>>'+i);
				//expect(i in registrosPorTema).toBeTruthy();

				//expect('previsto' in valoresPorTema[tema]).toBeTruthy();
				//expect('contratado' in valoresPorTema[tema]).toBeTruthy();
				//expect('executado' in valoresPorTema[tema]).toBeTruthy();

				//expect(valoresPorTema[tema].previsto).toEqual(previsto[i]); 
			}

			//expect('abacaxis' in valoresPorTema).not.toBeTruthy();
	  });

	  it("deveria obter os valores previstos, contratados e executados", function() {
			var valoresPorTema = Copa2014.valoresPorTema();
		
			temas = ['aeroportos','estádio','hotelaria','mobilidade','portos','segurança','telecomunicações'];
			previsto = ['7.335,03','6.760,80','0','11.352,30','898,90','104,67','371,22'];
			contratado = ['1.096,88','5.312,60','394,84','4.700,05','194,60','32,94','0'];
			executado = ['204,36','1.822,36','144,06','697,10', '0','0,47', '0'];
		
			for(i in temas) {
				tema = temas[i]; 
				expect(tema in valoresPorTema).toBeTruthy();
			
				expect('previsto' in valoresPorTema[tema]).toBeTruthy();
				expect('contratado' in valoresPorTema[tema]).toBeTruthy();
				expect('executado' in valoresPorTema[tema]).toBeTruthy();
			
				expect(valoresPorTema[tema].previsto).toEqual(previsto[i]); 
			}
		
			expect('abacaxis' in valoresPorTema).not.toBeTruthy();
	  });
  });
});