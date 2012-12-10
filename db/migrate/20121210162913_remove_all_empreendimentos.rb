class RemoveAllEmpreendimentos < ActiveRecord::Migration
  def up
  	Empreendimento.delete_all
  end

  def down
  end
end
