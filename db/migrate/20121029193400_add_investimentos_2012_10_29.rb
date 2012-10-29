class AddInvestimentos20121029 < ActiveRecord::Migration
  def up
  	Investimento.create tema: 'aeroporto', valor_previsto: 11526006117.74, valor_contratado: 1130333745.43, valor_executado: 387770126.12
		Investimento.create tema: 'desenvolvimento_turistico', valor_previsto: 122645297.9, valor_contratado: 0, valor_executado: 0
		Investimento.create tema: 'estadio', valor_previsto: 6761006000, valor_contratado: 5209292623.95, valor_executado: 2639149261.46
		Investimento.create tema: 'mobilidade_urbana', valor_previsto: 12363044736.84, valor_contratado: 6823525116.1, valor_executado: 615196100.84
		Investimento.create tema: 'porto', valor_previsto: 902800000, valor_contratado: 519962025.26, valor_executado: 109886422.27
		Investimento.create tema: 'seguranca', valor_previsto: 84873063.11, valor_contratado: 0, valor_executado: 0
  end

  def down
  end
end
