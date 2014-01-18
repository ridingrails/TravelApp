json.(@user, :email, :id)

json.groups_attended do |json|
  json.groups_attended(@user.groups_attended, :title, :theme)
end

json.user_interests do |json|
  json.user_interests(@user.user_interests, :title)
end
