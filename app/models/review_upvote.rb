class ReviewUpvote < ActiveRecord::Base
  attr_accessible :user_id, :review_id

  validates_presence_of :user_id, :review_id

  belongs_to :user

  belongs_to :review
end
