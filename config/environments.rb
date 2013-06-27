# encoding: utf-8

require 'uri'
require 'sinatra/activerecord'
# require 'sinatra/cache'

configure :development, :test do
  env = (ENV["RACK_ENV"] || "development")
  YAML::load(File.open('config/database.yml'))[env].symbolize_keys.each do |key, value|
    set key, value
  end

  ActiveRecord::Base.establish_connection(
    adapter: "mysql2", 
    host: settings.db_host,
    database: settings.db_name,
    username: settings.db_username,
    password: settings.db_password
  )
end

configure :production do
  # Database connection
  db = URI.parse(ENV['DATABASE_URL'] || 'postgres://localhost/mydb')

	ActiveRecord::Base.establish_connection(
	  :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
	  :host     => db.host,
	  :port     => db.port,
	  :username => db.user,
	  :password => db.password,
	  :database => db.path[1..-1],
	  :encoding => 'utf8'
	)
end

configure do
  Compass.configuration do |config|
    config.project_path = File.dirname(__FILE__)
    config.sass_dir = 'assets'
  end
  set :scss, Compass.sass_engine_options

  use Rack::Deflater

  # Constantes
  JSON_EXPIRE_TIME = 43200      # 12 horas
  HTML_EXPIRE_TIME = 604800     # 1 semana
  STATIC_EXPIRE_TIME = 604800   # 1 semana

  SENHA_ADMIN = "#opencopa$"

  set :static_cache_control, [:public, :max_age => STATIC_EXPIRE_TIME]
end

# NB! you need to set the root of the app first
# set :root, File.dirname(__FILE__)+"/../"
# set :cache_output_dir, File.dirname(__FILE__)+"/../public/system/cache"

# set :cache_enabled, true  # turn it on
# set :cache_environment, :development