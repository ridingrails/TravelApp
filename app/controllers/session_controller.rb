class SessionController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create]

  def create
    @user = User.find_by_username(params[:user][:username])

    if @user
      if @user.is_password?(password)
        login!(user)
        render :json => @user
      else
        render :json => @user.errors
      end
    else
      auth_hash = request.env['omniauth.auth']
      if logged_in?
        @user = User.find_by_session_token(session[:session_token])
        @user.add_provider(auth_hash)
        render :json => { message: "You are logged in with #{auth_hash["provider"]}! You have already signed up." }
      else
        auth = Authorization.find_or_create(auth_hash)
        @user = User.new(:name => auth_hash["user_info"]["name"],
                         :email => auth_hash["user_info"]["email"],
                         :username => params[:user][:username])
        @user.authorizations.build(:provider => auth_hash["provider"],
                                   :uid => auth_hash["uid"])
        @user.save
        login!(user)
        render :json => { message: "Hi #{user.name}! You've signed up." }
      end
    end
  end

  def destroy
    user = current_user
    logout!
    render :json => user
  end

  def failure
    render :json => { message: "Authorization denied."}
  end
end
