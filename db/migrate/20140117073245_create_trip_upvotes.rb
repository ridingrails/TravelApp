class CreateTripUpvotes < ActiveRecord::Migration
  def change
    create_table :trip_upvotes do |t|
      t.integer :user_id, :null => false
      t.integer :trip_id, :null => false

      t.timestamps
    end
    add_index :trip_upvotes, [:user_id, :trip_id], :unique => true
  end
end
