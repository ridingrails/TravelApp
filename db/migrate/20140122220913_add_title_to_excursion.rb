class AddTitleToExcursion < ActiveRecord::Migration
  def change
    add_column :excursions, :title, :string
  end
end
