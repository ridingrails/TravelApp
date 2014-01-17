class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :creator_id
      t.string :title
      t.string :theme
      :start_date, :end_date,
                        :privacy, :start_date, :end_date, :start_loc, :end_loc
      t.timestamps
    end
  end
end
