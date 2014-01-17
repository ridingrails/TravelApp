class Membership < ActiveRecord::Base
  attr_accessible :group_id, :member_id

  validates_presence_of :group_id, :member_id

  belongs_to(
    :member,
    :primary_key => :id,
    :foreign_key => :member_id,
    :class_name => "User"
  )

  belongs_to(
    :group,
    :primary_key => :id,
    :foreign_key => :group_id,
    :class_name => "Group"
  )

end
