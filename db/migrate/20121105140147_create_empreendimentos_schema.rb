class CreateEmpreendimentosSchema < ActiveRecord::Migration
  def up
  	create_table :empreendimentos do |t|
  		t.string :tema
  		t.string :cidade_sede
			t.string :descricao
  		t.float :valor_previsto
  		t.float :valor_contratado
  		t.float :valor_executado
  		
  		t.timestamps
  	end
  end

  def down
  	drop_table :empreendimentos
  end
end
