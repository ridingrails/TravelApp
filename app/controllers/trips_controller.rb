class TripsController < ApplicationController
  # before_filter :check_privacy, :except => [:create]

  def create
    @trip = Trip.new(params[:trip])
    if @trip.save!
      render :json => @trip
    else
      render :json => @trip.errors.full_messages,
             :status => :unprocessable_entity
    end
  end

  def show
    @trip = Trip.find(params[:id])
    render :json => @trip
  end
end
