json.(@trips) do |trip|

	json.title trip.title

	json.theme trip.theme

	json.description trip.description

	json.start_date trip.start_date

	json.end_date trip.end_date

	json.privacy trip.privacy

	json.start_loc trip.start_loc

	json.end_loc trip.end_loc

	json.id trip.id

	json.trip_photo_s trip.trip_photo.url(:small)

	json.trip_photo_m trip.trip_photo.url(:med)

	json.trip_photo_b trip.trip_photo.url(:big)

	json.excursions trip.excursions

	json.attendees trip.attendees
end