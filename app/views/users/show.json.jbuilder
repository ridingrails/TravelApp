json.(@user, :email, :id)

if @type == "dashboard"
elsif type == "feed"
else
  json.groups_attended do |json|
    json.groups_attended(@user.groups_attended, :title, :theme)
  end

  json.trips do |json|
    json.trips(@user.trips)
  end

  json.interests do |json|
    json.interests(@user.interests, :title)
  end
end