class Trip < ActiveRecord::Base
  before_save :location_case

  attr_accessible :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc, :trip_photo

  validate :time_constraint

  validates_presence_of :planner_id, :title, :theme, :start_date, :start_loc

  has_attached_file :trip_photo, :default_url => "https://s3-us-west-1.amazonaws.com/travelapp-el/trips/rio.jpg", :styles => {
       :big => "1180x520#",
       :med => "240x160#",
       :small => "120x120#"
     }

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

  def time_constraint
    unless self.start_date <= self.end_date
      errors.add(:base, "end time must be after start time")
    end
  end

  def location_case
    self.start_loc.capitalize!
    self.end_loc.capitalize! if self.end_loc
  end
end
