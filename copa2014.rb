require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/activerecord'
require 'haml'
require 'sass'
require 'compass'


env = (ENV["RACK_ENV"] || "development")
set :sass_dir, 'public/stylesheets'

YAML::load(File.open('config/database.yml'))[env].symbolize_keys.each do |key, value|
  set key, value
end

ActiveRecord::Base.establish_connection(
  adapter: "mysql", 
  host: settings.db_host,
  database: settings.db_name,
  username: settings.db_username,
  password: settings.db_password)

class Investimentos < ActiveRecord::Base  
end


configure do
  Compass.configuration do |config|
    config.project_path = File.dirname(__FILE__)
    config.sass_dir = 'asdasdasdasdas assets'
  end

  set :haml, { :format => :html5 }
  set :scss, Compass.sass_engine_options
  set :sass_dir, 'assets'
end

get '/main.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"stylesheet/main"
end

get "/" do
  # @invs = Investimentos.where tema: :aeroporto
	erb :index
end