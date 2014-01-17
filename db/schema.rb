# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140117073245) do

  create_table "authorizations", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "groups", :force => true do |t|
    t.integer  "creator_id",  :null => false
    t.string   "title",       :null => false
    t.text     "description"
    t.string   "theme",       :null => false
    t.string   "privacy",     :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "interests", :force => true do |t|
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "memberships", :force => true do |t|
    t.integer  "member_id",  :null => false
    t.integer  "group_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "memberships", ["member_id", "group_id"], :name => "index_memberships_on_member_id_and_group_id", :unique => true

  create_table "reservations", :force => true do |t|
    t.integer  "attendee_id", :null => false
    t.integer  "trip_id",     :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "reservations", ["attendee_id", "trip_id"], :name => "index_reservations_on_attendee_id_and_trip_id", :unique => true

  create_table "review_upvotes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "review_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "review_upvotes", ["user_id", "review_id"], :name => "index_review_upvotes_on_user_id_and_review_id", :unique => true

  create_table "reviews", :force => true do |t|
    t.string   "author_id",  :null => false
    t.string   "title",      :null => false
    t.string   "body",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "trip_upvotes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "trip_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "trip_upvotes", ["user_id", "trip_id"], :name => "index_trip_upvotes_on_user_id_and_trip_id", :unique => true

  create_table "trips", :force => true do |t|
    t.integer  "planner_id",  :null => false
    t.string   "title",       :null => false
    t.string   "theme",       :null => false
    t.text     "description"
    t.datetime "start_date",  :null => false
    t.datetime "end_date"
    t.string   "privacy",     :null => false
    t.string   "start_loc",   :null => false
    t.string   "end_loc"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "user_interests", :force => true do |t|
    t.integer  "user_id"
    t.integer  "interest_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "user_interests", ["user_id", "interest_id"], :name => "index_user_interests_on_user_id_and_interest_id", :unique => true

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "user_source"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true

end
