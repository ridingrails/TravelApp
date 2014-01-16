class ApplicationController < ActionController::Base
  include SessionHelper
  include ApplicationHelper
  protect_from_forgery
end
