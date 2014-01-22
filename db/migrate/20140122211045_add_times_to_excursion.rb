class AddTimesToExcursion < ActiveRecord::Migration
  def change
    add_column :excursions, :start_time, :integer
    add_column :excursions, :end_time, :integer
  end
end
