class GroupsController < ApplicationController
  def create
    @group = Group.new(params[:group])
    if @group.save!
      render :json => @group
    else
      render :json => @group.errors.full_messages,
             :status => :unprocessable_entity
    end
  end

  def show
    @group = Group.find(params[:id])
    render "show"
  end
end
