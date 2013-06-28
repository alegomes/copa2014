class UpdateEmpreendimentos < ActiveRecord::Migration
  def up
  	change_column :empreendimentos, :descricao, :string, :limit => 700
  end

  def down
  	change_column :empreendimentos, :descricao, :string, :limit => 255
  end
end
