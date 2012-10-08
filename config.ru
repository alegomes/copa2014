require 'rubygems'
require 'sinatra/activerecord/rake'
require 'bundler'

Bundler.require

require './copa2014'
run Sinatra::Application