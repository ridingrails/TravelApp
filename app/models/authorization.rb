class Authorization < ActiveRecord::Base
  attr_accessible :provider, :uid, :user_id

  validates_presence_of :provider, :uid

  belongs_to :user

  def self.find_or_create(auth_hash)
    unless auth = find_by_provider_and_uid(auth_hash["provider"],                                                          auth_hash["uid"])
      user = User.create(:name => auth_hash["user_info"]["name"],
                         :email => auth_hash["user_info"]["email"],
                         :username => params[:user]:username])
      auth = create(:user = user,
                    :provider => auth_hash["provider"],
                    :uid => auth_hash["uid"])
    end
    auth
  end
end
