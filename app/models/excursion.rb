class Excursion < ActiveRecord::Base
  attr_accessible :title, :body, :trip_id, :place, :location, :note, :start, :end, :start_time, :end_time, :last_editor, :latitude, :longitude

  before_validation :enter_date_hours

  validates_presence_of :title, :trip_id, :place, :start

  validate :overlapping_excursions, :time_constraint, :trip_constraint

  belongs_to :trip

  def overlapping_excursions

    query = <<-SQL
      SELECT
        excursions.*
      FROM
        excursions
      WHERE
        excursions.trip_id = ?
      AND
        (?, ?)
      OVERLAPS
        (excursions.start, excursions.end)
      LIMIT
        1
    SQL

    results = Excursion.find_by_sql([query,
                                          self.trip_id,
                                          self.start,
                                          self.end])

    unless results == []
      errors.add(:base, "overlaps with existing reservation")
    end
  end

  def enter_date_hours
    self.start.change(:hour => self.start_time.to_i )
    self.end.change(:hour => self.end_time.to_i )
  end

  def time_constraint
    unless self.start_time <= self.end_time
      errors.add(:base, "end time must be after start time")
    end
  end

  def trip_constraint
    unless (self.start >= self.trip.start_date) && (self.end <= self.trip.end_date)
      errors.add(:base, "must be within trip time period")
    end
  end
end
