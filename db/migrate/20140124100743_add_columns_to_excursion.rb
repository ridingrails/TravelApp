class AddColumnsToExcursion < ActiveRecord::Migration
  def change
    add_column :excursions, :latitude, :decimal
    add_column :excursions, :longitude, :decimal
  end
end
