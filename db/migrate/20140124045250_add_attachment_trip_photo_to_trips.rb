class AddAttachmentTripPhotoToTrips < ActiveRecord::Migration
  def self.up
    change_table :trips do |t|
      t.attachment :trip_photo
    end
  end

  def self.down
    drop_attached_file :trips, :trip_photo
  end
end
