class User < ActiveRecord::Base
  before_validation :ensure_session_token
  attr_accessible :email, :username, :name, :user_source, :password, :session_token
  attr_reader :password

  validates :email, :presence => { :message => "Email can't be blank" }
  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 5, :allow_nil => true }

  has_many :authorizations

  has_many(
    :trips_planned,
    :primary_key => :id,
    :foreign_key => :planner_id,
    :class_name => "Trip"
  )

  has_many(
    :trips,
    :through => :reservations,
    :source => :attendee
  )

  has_many(
    :groups_created,
    :primary_key => :id,
    :foreign_key => :creator_id,
    :class_name => "Group"
  )

  has_many(
    :groups,
    :through => :memberships,
    :source => :group
  )

  has_many(
    :groupmates,
    :through => :groups,
    :source => :members
  )

  has_many(
    :reservations,
    :primary_key => :id,
    :foreign_key => :attendee_id,
    :dependent => :destroy,
    :class_name => "Reservation"
  )

  has_many(
    :memberships,
    :primary_key => :id,
    :foreign_key => :member_id,
    :dependent => :destroy,
    :class_name => "Membership"
  )

  has_many :reviews

  has_many(
    :interests,
    :through => :user_interests,
    :source => :interest
  )

  has_many :user_interests

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
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

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
