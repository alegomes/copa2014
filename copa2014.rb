# encoding: utf-8

require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/activerecord'
require 'sinatra/content_for'
require 'uri'

require 'sass'
require 'compass'

require './config/environments'

require_relative 'extend_string'


class Investimento < ActiveRecord::Base  

  def to_hash
    {
      valor_previsto: valor_previsto.to_f,
      valor_contratado: valor_contratado.to_f,
      valor_executado: valor_executado.to_f,
      data: created_at.strftime("%m/%Y")
    }
  end

end

class Investimento2

  attr_accessor :valor_previsto, :valor_contratado, :valor_executado, :data

  def initialize
    @valor_previsto = 0.0
    @valor_contratado = 0.0
    @valor_executado = 0.0
  end

  def to_hash
    {
      valor_previsto: @valor_previsto.to_f,
      valor_contratado: @valor_contratado.to_f,
      valor_executado: @valor_executado.to_f,
      data: @data.strftime("%m/%Y")
    }
  end

end

class Empreendimento < ActiveRecord::Base

  def to_hash
    {
      valor_previsto: valor_previsto.to_f,
      valor_contratado: valor_contratado.to_f,
      valor_executado: valor_executado.to_f,
      data: created_at.strftime("%m/%Y")
    }
  end

  def self.temas
    [
      {
        :name => "estadio",
        :label => "Estádios e Arenas"
      },
      {
        :name => "aeroporto",
        :label => "Aeroportos"
      },
      {
        :name => "mobilidade_urbana",
        :label => "Mobilidade Urbana"
      },
      {
        :name => "desenvolvimento_turistico",
        :label => "Desenvolvimento Turístico"
      },
      {
        :name => "seguranca",
        :label => "Segurança"
      },
      {
        :name => "porto",
        :label => "Porto"
      }
    ]
  end

  def self.get_tema name
    self.temas.select do |tema|
      tema[:name] == name
    end
  end

  def self.cidades_sede
    [
      {
        :name => "brasilia",
        :label => "Brasília"
      },
      {
        :name => "cuiaba",
        :label => "Cuiabá"
      },
      {
        :name => "bh",
        :label => "Belo Horizonte"
      },
      {
        :name => "manaus",
        :label => "Manaus"
      },
      {
        :name => "fortaleza",
        :label => "Fortaleza"
      },
      {
        :name => "natal",
        :label => "Natal"
      },
      {
        :name => "recife",
        :label => "Recife"
      },
      {
        :name => "rio",
        :label => "Rio de Janeiro"
      },
      {
        :name => "sp",
        :label => "São Paulo"
      },
      {
        :name => "pa",
        :label => "Porto Alegre"
      },
      {
        :name => "salvador",
        :label => "Salvador"
      }
    ]
  end

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


get "/" do
  @investimentos = Investimento.order("created_at ASC").group_by(&:tema)

	erb :index, layout: :layout
end

get "/tema/:tema" do
  @tema = Empreendimento.get_tema(params[:tema]).first

  unless (@tema.nil?)
    @empreendimentos = Empreendimento.where(:tema => @tema[:name]).order("created_at ASC")

    @empreendimentos = @empreendimentos.map do |emp|
      emp.created_at = emp.created_at.strftime("%m/%Y")
      emp
    end
    @empreendimentos = @empreendimentos.group_by(&:created_at)
    @empreendimentos = @empreendimentos[@empreendimentos.keys.last]

    @investimentos = Investimento2.new
    @cidades_sede = {}

    @empreendimentos.each do |emp|
      @cidades_sede[emp.cidade_sede] = Investimento2.new() if @cidades_sede[emp.cidade_sede].nil?

      #Investimentos de cada cidade sede sobre o tema selecionado
      @cidades_sede[emp.cidade_sede].valor_previsto += emp.valor_previsto
      @cidades_sede[emp.cidade_sede].valor_contratado += emp.valor_contratado
      @cidades_sede[emp.cidade_sede].valor_executado += emp.valor_executado
      @cidades_sede[emp.cidade_sede].data = emp.created_at

      #Investimentos gerais do tema selecionado
      @investimentos.valor_previsto += emp.valor_previsto
      @investimentos.valor_contratado += emp.valor_contratado
      @investimentos.valor_executado += emp.valor_executado
      @investimentos.data = emp.created_at
    end

    erb :tema, layout: :layout
  end
end
