configure :development, :test do
  env = (ENV["RACK_ENV"] || "development")
  YAML::load(File.open('config/database.yml'))[env].symbolize_keys.each do |key, value|
    set key, value
  end

  ActiveRecord::Base.establish_connection(
    adapter: "mysql", 
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
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end