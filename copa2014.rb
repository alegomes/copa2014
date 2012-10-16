require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/activerecord'
require 'sinatra/content_for'
require 'uri'

require 'sass'
require 'compass'

require './config/environments'


class Investimento < ActiveRecord::Base  
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

helpers do
  def format_number number
    ("%.2f" % number).gsub('.',',').gsub(/(\d)(?=\d{3}+(,\d*)?$)/,'\1.')
  end

  def format_percent value, base
    ((value / base) * 100).round.to_i
  end
end



get "/" do
  @investimentos = Investimento.all
  @investimentos.each do |inv|
    @aeroporto = inv if inv.tema.to_sym == :aeroporto
    @desenvolvimento_turistico = inv if inv.tema.to_sym == :desenvolvimento_turistico
    @estadio = inv if inv.tema.to_sym == :estadio
    @mobilidade_urbana = inv if inv.tema.to_sym == :mobilidade_urbana
    @porto = inv if inv.tema.to_sym == :porto
    @seguranca = inv if inv.tema.to_sym == :seguranca
  end

	erb :index, layout: :layout
end

get "/proporcao-de-valores" do
  erb :proporcao_valores, layout: :layout
end


