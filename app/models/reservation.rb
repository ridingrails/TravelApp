class Reservation < ActiveRecord::Base
  attr_accessible :attendee_id, :trip_id

  validates_presence_of :attendee_id, :trip_id
  validate :overlapping_reservations

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

  def overlapping_reservations

    query = <<-SQL
      SELECT
        reservations.*
      FROM
        reservations
      JOIN
        trips ON reservations.trip_id = trips.id
      WHERE
        reservations.attendee_id = ?
      AND
        (?, ?)
      OVERLAPS
        (trips.start_date, trips.end_date)
      LIMIT
        1
    SQL

    results = Reservation.find_by_sql([query,
                                          self.attendee_id,
                                          self.trip.start_date,
                                          self.trip.end_date])

    unless results == []
      errors.add(:base, "overlaps with existing reservation")
    end
  end


  # def overlapping_approved_reservations
  #   unless self.overlapping_reservations.empty?
  #     errors.add(:base, "overlaps with existing reservation")
  #   end
  # end

  def overlapping_pending_reservations
    query = <<-SQL
      SELECT
        reservations.*
      FROM
        reservations
      WHERE
        reservations.attendee_id = ?
      AND
        reservations.trip_id = ?
      AND
        (?, ?)
      OVERLAPS
        (reservations.start_date, reservations.end_date)
    SQL

    results = Reservation.find_by_sql([query,
                                          self.attendee_id, self.trip_id,
                                          self.start_date,
                                          self.end_date])
  end

  # def approve!
  #   ActiveRecord::Base.transaction do
  #     self.save!
  #
  #     results_to_deny = overlapping_pending_reservations
  #
  #     results_to_deny.each do |reservation|
  #       reservation.deny!
  #       reservation.save! unless reservation.persisted?
  #     end
  #   end
  # end
  #
  # def deny!
  #   errors.add(:base, "reservation denied")
  # end

end
