class AddInvestimentos20121016 < ActiveRecord::Migration
  def up
  	Investimento.create tema: "aeroporto", valor_previsto: 11526006117.74, valor_contratado: 1130333745.43, valor_executado: 258606413.81
  	Investimento.create tema: "desenvolvimento_turistico", valor_previsto: 122645297.90, valor_contratado: 0.00, valor_executado: 0.00
  	Investimento.create tema: "estadio", valor_previsto: 6761000000.00, valor_contratado: 5185364327.09, valor_executado: 2549149261.46
  	Investimento.create tema: "mobilidade_urbana", valor_previsto: 12363044736.84, valor_contratado: 6782586809.05, valor_executado: 589693925.16
  	Investimento.create tema: "porto", valor_previsto: 902800000.00, valor_contratado: 519962025.26, valor_executado: 93223268.95
  	Investimento.create tema: "seguranca", valor_previsto: 84873063.11, valor_contratado: 0.00, valor_executado: 0.00
  end

  def down
  end
end
