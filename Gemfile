source :rubygems

gem 'sinatra'
gem 'sinatra-contrib'
# gem 'sinatra-cache'
gem 'activerecord'
gem 'sinatra-activerecord'
gem 'sass'
gem 'compass'
gem 'dalli'
gem 'rack-cache'

group :development, :test do
  gem 'mysql2'
  gem 'activerecord-mysql2-adapter'
end

group :production do
  gem 'pg' # this gem is required to use postgres on Heroku
  gem 'unicorn'
end
