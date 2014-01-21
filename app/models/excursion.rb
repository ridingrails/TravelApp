class Excursion < ActiveRecord::Base
  attr_accessible :title, :body, :trip_id, :place, :location, :note, :start, :end, :last_editor

  validates_presence_of :title, :trip_id, :place, :start

  belongs_to :trip

end
