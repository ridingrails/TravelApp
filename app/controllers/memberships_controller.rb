class MembershipsController < ApplicationController
  def create
    @membership = Membership.new(params[:membership])
    if @membership.save!
      render :json => @membership
    else
      render :json => @membership.errors.full_messages, :status =>       :unprocessable_entity
    end
  end
end
