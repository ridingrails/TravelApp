class ExcursionsController < ApplicationController
  def create
    @excursion = Excursion.new(params[:excursion])
    if @excursion.save
      render :json => @excursion
    else
      render :json => @excursion.errors
    end
  end

  def update
  end
end
