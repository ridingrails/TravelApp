class UserInterest < ActiveRecord::Base
  attr_accessible :user_id, :interest_id

  validates_presence_of :user_id, :interest_id

  belongs_to :user

  belongs_to :interest
end
