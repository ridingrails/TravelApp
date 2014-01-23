class Trip < ActiveRecord::Base
  before_save :location_case

  attr_accessible :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc

  validates_presence_of :planner_id, :title, :theme, :start_date, :start_loc

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

  def location_case
    self.start_loc.capitalize!
    self.end_loc.capitalize! if self.end_loc
  end
end
