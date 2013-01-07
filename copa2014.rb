# encoding: utf-8

require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/activerecord'
require 'sinatra/content_for'
require 'uri'
require "dalli"
require "rack-cache"
require 'json'

require 'sass'
require 'compass'

require './config/environments'
require './extend_string'
require './models/investimento'
require './models/empreendimento'
require './models/tema'
require './models/receive_update'


# Constantes
JSON_EXPIRE_TIME = 43200      # 12 horas
HTML_EXPIRE_TIME = 604800     # 1 semana
STATIC_EXPIRE_TIME = 604800   # 1 semana


get '/stylesheet/common.css' do
  content_type 'text/css', :charset => 'utf-8'
  cache_control :public, max_age: STATIC_EXPIRE_TIME
  scss :"../assets/stylesheet/common"
end
get '/stylesheet/bootstrap.min.css' do
  content_type 'text/css', :charset => 'utf-8'
  cache_control :public, max_age: STATIC_EXPIRE_TIME
  scss :"../assets/stylesheet/bootstrap.min"
end
get '/javascript/*' do
  content_type 'text/javascript', :charset => 'utf-8'
  params[:splat].each do |js|
    cache_control :public, max_age: STATIC_EXPIRE_TIME
    send_file File.open(File.dirname(__FILE__)+"/assets/javascript/"+js)
  end
end
get '/images/*' do
  content_type 'image/png', :charset => 'utf-8'
  params[:splat].each do |image|
    cache_control :public, max_age: STATIC_EXPIRE_TIME
    send_file File.open(File.dirname(__FILE__)+"/assets/images/"+image)
  end
end


get "/" do
  cache_control :public, max_age: HTML_EXPIRE_TIME
	erb :index, layout: :layout, :default_encoding => settings.default_encoding
end

get "/tema/:tema" do
  @tema = Tema.get(params[:tema]).first

  unless (@tema.nil?)
    if (@tema[:name] == "seguranca")
      @cidade_sede = {:name => "nacional", :label => "", :label_html => ""}
      @temas_cidade_sede = []

      @empreendimentos = Empreendimento.where(:tema => @tema[:name], :created_at => Empreendimento.maximum(:created_at))
        .where('valor_previsto > 0')

      cache_control :public, max_age: HTML_EXPIRE_TIME
      erb :cidade_sede, layout: :layout, :default_encoding => settings.default_encoding
    else
      @cidades_sede = Empreendimento.select(:cidade_sede).uniq.where(:tema => @tema[:name])
      @cidades_sede.map!{ |emp| emp.cidade_sede }

      cache_control :public, max_age: HTML_EXPIRE_TIME
      erb :tema, layout: :layout, :default_encoding => settings.default_encoding
    end
  end
end

get "/tema/:tema/cidade-sede/:cidade_sede" do
  @tema = Tema.get(params[:tema]).first
  @cidade_sede = Tema.get_cidade_sede(params[:cidade_sede]).first

  unless (@tema.nil? or @cidade_sede.nil?)
    #Recupera os temas possíveis
    @temas_cidade_sede = Empreendimento.select(:tema).uniq.where(:cidade_sede => @cidade_sede[:name])
    @temas_cidade_sede.map!{ |e| e.tema }

    @empreendimentos = Empreendimento.where(:tema => @tema[:name], :cidade_sede => @cidade_sede[:name], 
      :created_at => Empreendimento.maximum(:created_at)).where('valor_previsto > 0')

    cache_control :public, max_age: HTML_EXPIRE_TIME
    erb :cidade_sede, layout: :layout, :default_encoding => settings.default_encoding
  end
end

get "/about" do
  cache_control :public, max_age: HTML_EXPIRE_TIME
  erb :about, layout: :layout, :default_encoding => settings.default_encoding
end

post '/receive-update' do
  content_type 'application/json', :charset => 'utf-8'
  
  email = params[:email]
  unless (ReceiveUpdate.find_by_email(email))
    ReceiveUpdate.new({:email => email}).save
    { :type => :success, :message => 'E-mail cadastrado com sucesso!' }.to_json
  else
    { :type => :error, :message => 'E-mail já cadastrado!' }.to_json
  end
end

get "/api/geral" do
  investimentos = {}

  empreendimentos = Empreendimento.order("created_at ASC").all
  empreendimentos = empreendimentos.map do |emp|
    emp.created_at = emp.created_at.strftime("%y-%m-%d")
    emp
  end
  empreendimentos = empreendimentos.group_by(&:tema)

  empreendimentos.each do |emp_tmp|
    ordered_emp = emp_tmp.second.group_by(&:created_at)

    # Pega apenas os 4 últimos
    keys = ordered_emp.keys
    if keys.size > 4
      keys = keys.slice keys.size-4, keys.size
    end

    ordered_emp_filtered = {}
    ordered_emp.each do |e|
      ordered_emp_filtered[e.first] = e.second if keys.include? e.first
    end

    investimentos[emp_tmp.first.to_sym] = [] unless investimentos[emp_tmp.first]
    ordered_emp_filtered.each do |empreendimento|
      
      investimento_tema = Investimento.new
      empreendimento.second.each do |e|
        investimento_tema.valor_previsto += e.valor_previsto
        investimento_tema.valor_contratado += e.valor_contratado
        investimento_tema.valor_executado += e.valor_executado
      end
      investimento_tema.data = empreendimento.first

      investimentos[emp_tmp.first.to_sym].push investimento_tema
    end
  end

  content_type 'application/json', :charset => 'utf-8'
  # cache_control :public, max_age: JSON_EXPIRE_TIME
  investimentos.to_json
end

get "/api/tema/:tema" do
  tema = Tema.get(params[:tema]).first

  unless (tema.nil?)
    empreendimentos = Empreendimento.where(:tema => tema[:name], :created_at => Empreendimento.maximum(:created_at))
      .where('valor_previsto > 0')

    investimento_tema = Investimento.new
    cidades_sede = {}

    empreendimentos.each do |emp|
      cidades_sede[emp.cidade_sede] = Investimento.new() if cidades_sede[emp.cidade_sede].nil?

      #Investimentos de cada cidade sede sobre o tema selecionado
      cidades_sede[emp.cidade_sede].valor_previsto += emp.valor_previsto
      cidades_sede[emp.cidade_sede].valor_contratado += emp.valor_contratado
      cidades_sede[emp.cidade_sede].valor_executado += emp.valor_executado
      cidades_sede[emp.cidade_sede].data = emp.created_at

      #Investimentos gerais do tema selecionado
      investimento_tema.valor_previsto += emp.valor_previsto
      investimento_tema.valor_contratado += emp.valor_contratado
      investimento_tema.valor_executado += emp.valor_executado
      investimento_tema.data = emp.created_at
    end

    content_type 'application/json', :charset => 'utf-8'
    cache_control :public, max_age: JSON_EXPIRE_TIME
    { :cidades_sede => cidades_sede, :investimento_tema => investimento_tema.to_hash }.to_json
  end
end

get "/api/tema/:tema/cidade-sede/:cidade_sede" do
  tema = Tema.get(params[:tema]).first
  cidade_sede = Tema.get_cidade_sede(params[:cidade_sede]).first

  if params[:cidade_sede] == "nacional"
    cidade_sede = { :name => "nacional", :label => "", :label_html => "" }
  end

  unless (tema.nil? or cidade_sede.nil?)
    unless cidade_sede[:name] == "nacional"
      empreendimentos = Empreendimento.where(:tema => tema[:name], :cidade_sede => cidade_sede[:name], 
        :created_at => Empreendimento.maximum(:created_at)).where('valor_previsto > 0')
    else
      empreendimentos = Empreendimento.where(:tema => tema[:name], :created_at => Empreendimento.maximum(:created_at))
        .where('valor_previsto > 0')
    end

    investimento_cidade_sede = Investimento.new

    empreendimentos.each do |emp|
      #Investimentos gerais da cidade sede selecionada
      investimento_cidade_sede.valor_previsto += emp.valor_previsto
      investimento_cidade_sede.valor_contratado += emp.valor_contratado
      investimento_cidade_sede.valor_executado += emp.valor_executado
      investimento_cidade_sede.data = emp.created_at
    end

    content_type 'application/json', :charset => 'utf-8'
    cache_control :public, max_age: JSON_EXPIRE_TIME
    { :empreendimentos => empreendimentos.map!(&:to_hash), :investimento_cidade_sede => investimento_cidade_sede }.to_json
  end
end
