class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :attendee_id, :null => false
      t.integer :trip_id, :null => false

      t.timestamps
    end
    add_index :reservations, [:attendee_id, :trip_id], :unique => true
  end
end
