class Trip < ActiveRecord::Base
  attr_accessible :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc

  validates_presence_of :planner_id, :title, :theme, :start_date, :privacy, :start_loc

  belongs_to(
    :planner,
    :primary_key => :id,
    :foreign_key => :planner_id,
    :class_name => "User"
  )

  has_many(
    :reservations,
    :primary_key => :id,
    :foreign_key => :trip_id,
    :dependent => :destroy,
    :class_name => "Reservation"
  )

  has_many(
    :attendees,
    :through => :reservations,
    :source => :attendee
  )

  has_many :excursions
end
