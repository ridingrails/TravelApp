FactoryGirl.define do
  factory :user do
    sequence :name do |n|
      Faker::Name.name + "#{n}"
    end
    sequence :email do |n|
      Faker::Internet.email + "#{n}"
    end
    password  "password"
  end

  factory :group do
    creator_id 10
    sequence :title do |n|
      Faker::Company.name + "#{n}"
    end
    sequence :theme do |n|
      Faker::Company.name
    end
    privacy "public"
  end

  factory :trip do
    planner_id 10
    sequence :title do |n|
      Faker::Company.name + "#{n}"
    end
    sequence :theme do |n|
      Faker::Company.name
    end
    description Faker::Lorem.paragraph
    start_date Time.now.next_week
    end_date Time.now.next_month
    privacy "public"
    start_loc "New York"
    end_loc "San Francisco"
  end

  def rand_time(from, to=Time.now)
    Time.at(rand_in_range(from.to_f, to.to_f))
  end

  def rand_in_range(from, to)
    rand * (to - from) + from
  end
end