class AddAttachmentGroupPhotoToGroups < ActiveRecord::Migration
  def self.up
    change_table :groups do |t|
      t.attachment :group_photo
    end
  end

  def self.down
    drop_attached_file :groups, :group_photo
  end
end
