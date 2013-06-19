source 'https://rubygems.org'

gem 'sinatra'
gem 'sinatra-contrib'
gem 'activerecord'
gem 'sinatra-activerecord'
gem 'sass'
gem 'compass'
gem 'dalli'
gem 'rack-cache'
gem 'httparty'

group :development, :test do
  gem 'mysql2'
  gem 'activerecord-mysql2-adapter'
  gem 'debugger'
  gem 'rspec'
end

group :production do
  gem 'pg' # this gem is required to use postgres on Heroku
  gem 'unicorn'
end