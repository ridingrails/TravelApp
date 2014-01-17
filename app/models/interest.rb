class Interest < ActiveRecord::Base
  attr_accessible :title

  validates_presence_of :title

  has_many :user_interests
end
