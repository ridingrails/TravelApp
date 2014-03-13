json.(@trip, :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc, :id)

json.trip_photo @trip.trip_photo(:small)

json.trip_photo @trip.trip_photo(:med)

json.trip_photo @trip.trip_photo(:big)

json.excursions @trip.excursions

json.attendees @trip.attendees