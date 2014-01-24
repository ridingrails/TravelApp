json.(@user, :email, :id)

if @type == "dashboard"
elsif @type == "feed"
else
  json.groups_attended @user.groups_attended

  json.memberships @user.memberships

  json.reservations @user.reservations

  json.trips @user.trips

  json.trips_planned @user.trips_planned

  json.interests @user.interests
end