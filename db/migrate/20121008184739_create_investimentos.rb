class CreateInvestimentos < ActiveRecord::Migration
  def self.up
  	create_table :investimento do |t|
  		t.string :tema
  		t.float :valor_previsto
  		t.float :valor_contratado
  		t.float :valor_executado
  		t.datetime :created_at
  	end
  end

  def self.down
  	drop_table :investimento
  end
end
