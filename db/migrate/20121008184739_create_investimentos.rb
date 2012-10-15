class CreateInvestimentos < ActiveRecord::Migration
  def self.up
  	puts 'Aew'
  	create_table :investimentos2 do |t|
  		t.string :tema
  		t.float :valor_previsto
  		t.float :valor_contratado
  		t.float :valor_executado
  		t.datetime :created_at
  	end
  end

  def self.down
  	drop_table :investimentos
  end
end
