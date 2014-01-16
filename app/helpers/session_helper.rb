module SessionHelper
  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user!
    render :json => "Need to be signed in" unless current_user
  end

  def require_no_current_user!
    render :json => "You are already signed in" if current_user
  end
end
