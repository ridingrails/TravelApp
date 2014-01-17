class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :planner_id, :null => false
      t.string :title, :null => false
      t.string :theme, :null => false
      t.text :description
      t.datetime :start_date, :null => false
      t.datetime :end_date
      t.string :privacy, :null => false
      t.string :start_loc, :null => false
      t.string :end_loc

      t.timestamps
    end
  end
end
