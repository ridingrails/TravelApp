json.(@user, :email, :id)

if @type == "dashboard"
elsif @type == "feed"
else
  json.groups_attended @user.groups_attended

  json.trips @user.trips

  json.interests @user.interests
end