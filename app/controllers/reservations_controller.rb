class ReservationsController < ApplicationController
  def create
    @reservation = Reservation.new(params[:reservation])
    if @reservation.save!
      render :json => @reservation
    else
      render :json => @reservation.errors.full_messages, :status =>       :unprocessable_entity
    end
  end
end
