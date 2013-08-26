require './copa2014'
require './lib/cgu_ws.rb'
require 'sinatra/activerecord/rake'
require 'debugger'

task :environment do
  require File.expand_path(File.join(*%w[ config environments ]), File.dirname(__FILE__))
end

namespace :cgu do
  desc "Atualizar dados a partir do WS da CGU"
  task atualizar_dados: :environment do
    CguWS.new.atualizar_dados
  end
end