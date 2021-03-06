class UsersController < ApplicationController


  def index
    @users = User.all
    render :json => @users
  end

  def create
    @user = User.new(params[:user])

    if @user.save!
      login!(@user)
      render :json => @user
    else
      render :json => @user.errors.full_messages,
             :status => :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render "show"
  end
end
