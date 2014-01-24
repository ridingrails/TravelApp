class ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all
    render :json => @reservations
  end

  def create
    @reservation = Reservation.new(params[:reservation])
    if @reservation.save!
      render :json => @reservation
    else
      render :json => @reservation.errors.full_messages, :status =>       :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find_by_trip_id_and_attendee_id(params[:trip_id], params[:attendee_id])
    @item = @reservation
    @reservation.destroy
    render :json => @item
  end
end
