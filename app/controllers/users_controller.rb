class UsersController < ApplicationController
  # before_filter :require_current_user!, :except => [:create]

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
    render :json => @user
  end
end
