class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :author_id, :null => false
      t.string :title, :null => false
      t.string :body, :null => false

      t.timestamps
    end
  end
end
