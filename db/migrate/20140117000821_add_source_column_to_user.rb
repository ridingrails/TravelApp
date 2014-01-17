class AddSourceColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :user_source, :string
  end
end
