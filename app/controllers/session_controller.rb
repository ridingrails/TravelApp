class SessionController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :failure]

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                        params[:user][:password])
    if @user
      login!(user)
      render :json => @user
    else
      render :json => ["Invalid username or password"]
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

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
