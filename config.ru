require 'rubygems'
require 'sinatra/activerecord/rake'
require 'bundler'

Bundler.require

require './copa2014'

# Defined in ENV on Heroku. To try locally, start memcached and uncomment:
# ENV["MEMCACHE_SERVERS"] = "localhost"
if memcache_servers = ENV["MEMCACHE_SERVERS"]
  use Rack::Cache,
    verbose: true,
    metastore:   "memcached://#{memcache_servers}",
    entitystore: "memcached://#{memcache_servers}"
end

run Sinatra::Application