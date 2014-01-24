json.(@group, :creator_id, :title, :description, :theme, :privacy)

json.members @group.group_members

json.group_photo @trip.group_photo(:med)
