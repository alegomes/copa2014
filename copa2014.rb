require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/activerecord'
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
    config.sass_dir = 'assets'
  end
  set :scss, Compass.sass_engine_options
end
get '/main.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"../assets/stylesheet/main"
end
get '/javascript/*' do
  content_type 'text/javascript', :charset => 'utf-8'
  params[:splat].each do |js|
    send_file File.open(File.dirname(__FILE__)+"/assets/javascript/"+js)
  end
end
get '/images/*' do
  content_type 'image/png', :charset => 'utf-8'
  params[:splat].each do |image|
    send_file File.open(File.dirname(__FILE__)+"/assets/images/"+image)
  end
end



get "/" do
  # @invs = Investimentos.where tema: :aeroporto
	erb :index, layout: :layout
end

get "/proporcao-de-valores" do
  erb :proporcao_valores, layout: :layout
end


