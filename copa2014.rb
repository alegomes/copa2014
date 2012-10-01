require 'sinatra'
require "sinatra/reloader" if development?
require 'savon'

get "/" do
  send_file File.join(settings.public_folder, 'index.html')
end

get "/teste" do
	# client = Savon.client("http://www.thomas-bayer.com/axis2/services/BLZService?wsdl")

	# puts client.wsdl.soap_actions

	# response = client.request :get_bank, :body => { :blz => "70070010" }
	# puts response.body[:get_bank_response][:details]

	client = Savon.client("http://transparencia.gov.br/copa2014/gestor/portalcopaws?wsdl")
	
	puts client.wsdl.soap_actions

	response = client.request :get_arquivo, :body => { :id_arquivo => 1 }

  send_file File.join(settings.public_folder, 'teste.html')
end
