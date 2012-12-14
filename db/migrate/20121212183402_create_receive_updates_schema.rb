class CreateReceiveUpdatesSchema < ActiveRecord::Migration
  def up
  	create_table :receive_updates do |t|
  		t.string :email
  		
  		t.timestamps
  	end
  end

  def down
  	drop_table :receive_updates
  end
end
