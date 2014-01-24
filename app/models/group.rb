class Group < ActiveRecord::Base
  attr_accessible :creator_id, :title, :description, :theme, :privacy, :group_photo

  validates_presence_of :creator_id, :title, :theme, :privacy

  has_attached_file :group_photo, :styles => {
       :big => "1180x520#",
       :med => "240x120#",
       :small => "120x120#"
     }

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
    :group_members,
    :through => :memberships,
    :source => :member
  )
end
