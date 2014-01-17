class Reservation < ActiveRecord::Base
  attr_accessible :attendee_id, :trip_id

  validates_presence_of :attendee_id, :trip_id

  belongs_to(
    :attendee,
    :primary_key => :id,
    :foreign_key => :attendee_id,
    :class_name => "User"
  )

  belongs_to(
    :trip,
    :primary_key => :id,
    :foreign_key => :trip_id,
    :class_name => "Trip"
  )

end
