source 'http://rubygems.org'

gem 'sinatra'
gem 'sinatra-contrib'
gem 'activerecord'
gem 'sinatra-activerecord'
gem 'sass'
gem 'compass'

group :development, :test do
  gem 'mysql2'
  gem 'activerecord-mysql2-adapter'
end

group :production do
  gem 'pg' # this gem is required to use postgres on Heroku
end
