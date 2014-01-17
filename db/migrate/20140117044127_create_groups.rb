class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.integer :creator_id, :null => false
      t.string :title, :null => false
      t.text :description
      t.string :theme, :null => false
      t.string :privacy, :null => false

      t.timestamps
    end
  end
end
