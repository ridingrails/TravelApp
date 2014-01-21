class CreateExcursions < ActiveRecord::Migration
  def change
    create_table :excursions do |t|
      t.integer :trip_id, :null => false
      t.string :place, :null => false
      t.string :location
      t.text :note
      t.datetime :start, :null => false
      t.datetime :end
      t.integer :last_editor

      t.timestamps
    end
  end
end
