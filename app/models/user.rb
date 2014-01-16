class User < ActiveRecord::Base
  before_validation :ensure_session_token
  attr_accessible :email, :username, :name, :password, :session_token
  attr_reader :password

  validates_presence_of :email, :name
  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 5, :allow_nil => true }

  has_many :authorizations

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def add_provider(auth_hash)
    unless authorizations.find_by_provider_and_uid(auth_hash["provider"],
                                                   auth_hash["uid"])
      Authorization.create(:user => self,
                            :provider => auth_hash["provider"],
                            :uid => auth_hash["uid"])
    end
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
