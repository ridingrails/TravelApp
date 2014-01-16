class UsersController < ApplicationController
  before_filter :require_current_user!, :except => [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save!
      current_user = @user
      render :json => @user
    else
      render :json => @user.errors.full_messages,
             :status => :unprocessable_entity
    end
  end

  def new
    @user = User.new
    render :json => @user
  end
end
