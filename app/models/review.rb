class Review < ActiveRecord::Base
  attr_accessible :title, :author_id, :body

  validates_presence_of :title, :author_id, :body

  belongs_to(
    :author,
    :primary_key => :id,
    :foreign_key => :author_id
    :class_name => "User"
  )
end
