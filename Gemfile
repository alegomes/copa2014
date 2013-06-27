source 'https://rubygems.org'

gem 'sinatra', '1.3.2'
gem 'sinatra-contrib', '1.3.1'
gem 'activerecord'
gem 'sinatra-activerecord', '1.1.1'
gem 'sass'
gem 'compass'
gem 'dalli'
gem 'rack-cache'
gem 'httparty'
gem 'restfulie', '>= 1.1.1'

group :development, :test do
  gem 'mysql2'
  gem 'activerecord-mysql2-adapter'
  gem 'debugger'
  gem 'rspec'
  gem 'awesome_print'
end

group :production do
  gem 'pg' # this gem is required to use postgres on Heroku
  gem 'unicorn'
end