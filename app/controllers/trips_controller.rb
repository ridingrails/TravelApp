class TripsController < ApplicationController
  # before_filter :check_privacy, :except => [:create]

  def index
    @trips = Trip.all
    render :json => @trips
  end

  def create
    params[:trip][:planner_id] = current_user.id
    params[:trip][:start_loc].capitalize!
    @trip = Trip.new(params[:trip])
    if @trip.save!
      render "show"
    else
      render :json => @trip.errors.full_messages,
             :status => :unprocessable_entity
    end
  end

  def show
    @trip = Trip.find(params[:id])
    render "show"
  end
end
