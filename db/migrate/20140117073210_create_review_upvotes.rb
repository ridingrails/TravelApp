class CreateReviewUpvotes < ActiveRecord::Migration
  def change
    create_table :review_upvotes do |t|
      t.integer :user_id, :null => false
      t.integer :review_id, :null => false

      t.timestamps
    end
    add_index :review_upvotes, [:user_id, :review_id], :unique => true
  end
end
