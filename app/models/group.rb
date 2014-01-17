class Group < ActiveRecord::Base
  attr_accessible :creator_id, :title, :description, :theme, :privacy

  validates_presence_of :user_id, :title, :theme, :privacy

  belongs_to(
    :creator,
    :primary_key => :id,
    :foreign_key => :creator_id,
    :class_name => "User"
  )

  has_many(
    :memberships,
    :primary_key => :id,
    :foreign_key => :group_id,
    :dependent => :destroy,
    :class_name => "Membership"
  )

  has_many(
    :members,
    :through => :memberships,
    :source => :member
  )
end
