json.(@trip, :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc)

json.excursions @trip.excursions

json.attendees @trip.attendees