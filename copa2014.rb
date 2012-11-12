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


class Investimento

  attr_accessor :valor_previsto, :valor_contratado, :valor_executado, :data

  def initialize
    @valor_previsto = 0.0
    @valor_contratado = 0.0
    @valor_executado = 0.0
  end

  def to_hash
    {
      valor_previsto: format("%.2f", @valor_previsto).to_f,
      valor_contratado: format("%.2f", @valor_contratado).to_f,
      valor_executado: format("%.2f", @valor_executado).to_f,
      data: @data.strftime("%m/%Y")
    }
  end

end

class Empreendimento < ActiveRecord::Base

  def to_hash
    {
      valor_previsto: format("%.2f", valor_previsto).to_f,
      valor_contratado: format("%.2f", valor_contratado).to_f,
      valor_executado: format("%.2f", valor_executado).to_f,
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
        :name => "belo_horizonte",
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
        :name => "rio_de_janeiro",
        :label => "Rio de Janeiro"
      },
      {
        :name => "sao_paulo",
        :label => "São Paulo"
      },
      {
        :name => "porto_alegre",
        :label => "Porto Alegre"
      },
      {
        :name => "salvador",
        :label => "Salvador"
      },
      {
        :name => "curitiba",
        :label => "Curitiba"
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
  # @investimentos = Investimento.order("created_at ASC").group_by(&:tema)

  @investimentos = {}

  @empreendimentos = Empreendimento.order("created_at ASC").all
  @empreendimentos = @empreendimentos.map do |emp|
    emp.created_at = emp.created_at.strftime("%d/%m/%Y")
    emp
  end
  @empreendimentos = @empreendimentos.group_by(&:tema)

  @empreendimentos.each do |emp_tmp|
    ordered_emp = emp_tmp.second.group_by(&:created_at)

    @investimentos[emp_tmp.first.to_sym] = [] unless @investimentos[emp_tmp.first]
    ordered_emp.each do |empreendimento|
      
      investimento_tema = Investimento.new
      empreendimento.second.each do |e|
        investimento_tema.valor_previsto += e.valor_previsto
        investimento_tema.valor_contratado += e.valor_contratado
        investimento_tema.valor_executado += e.valor_executado
      end
      investimento_tema.data = empreendimento.first

      @investimentos[emp_tmp.first.to_sym].push investimento_tema
    end
  end

	erb :index, layout: :layout
end

get "/tema/:tema" do
  @tema = Empreendimento.get_tema(params[:tema]).first

  unless (@tema.nil?)
    @empreendimentos = Empreendimento.where(:tema => @tema[:name]).order("created_at ASC")

    @empreendimentos = @empreendimentos.map do |emp|
      emp.created_at = emp.created_at.strftime("%d/%m/%Y")
      emp
    end
    @empreendimentos = @empreendimentos.group_by(&:created_at)
    @empreendimentos = @empreendimentos[@empreendimentos.keys.last]

    @investimento_tema = Investimento.new
    @cidades_sede = {}

    @empreendimentos.each do |emp|
      @cidades_sede[emp.cidade_sede] = Investimento.new() if @cidades_sede[emp.cidade_sede].nil?

      #Investimentos de cada cidade sede sobre o tema selecionado
      @cidades_sede[emp.cidade_sede].valor_previsto += emp.valor_previsto
      @cidades_sede[emp.cidade_sede].valor_contratado += emp.valor_contratado
      @cidades_sede[emp.cidade_sede].valor_executado += emp.valor_executado
      @cidades_sede[emp.cidade_sede].data = emp.created_at

      #Investimentos gerais do tema selecionado
      @investimento_tema.valor_previsto += emp.valor_previsto
      @investimento_tema.valor_contratado += emp.valor_contratado
      @investimento_tema.valor_executado += emp.valor_executado
      @investimento_tema.data = emp.created_at
    end

    puts @investimento_tema.valor_previsto

    erb :tema, layout: :layout
  end
end
