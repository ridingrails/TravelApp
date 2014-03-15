json.(@trip, :planner_id, :title, :theme, :description, :start_date, :end_date, :privacy, :start_loc, :end_loc, :id)

json.trip_photo_s @trip.trip_photo.url(:small)

json.trip_photo_m @trip.trip_photo.url(:med)

json.trip_photo_b @trip.trip_photo.url(:big)

json.excursions @trip.excursions

json.attendees @trip.attendees