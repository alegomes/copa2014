class CreateInvestimentosSchema < ActiveRecord::Migration
  def up
  	create_table :investimentos do |t|
  		t.string :tema
  		t.float :valor_previsto
  		t.float :valor_contratado
  		t.float :valor_executado
  		
  		t.timestamps
  	end
  end

  def down
  	drop_table :investimentos
  end
end
