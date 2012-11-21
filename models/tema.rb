# encoding: utf-8

class Tema
	
	def self.all
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

  def self.get name
    self.all.select do |tema|
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

  def self.get_cidade_sede name
    self.cidades_sede.select do |cidade_sede|
      cidade_sede[:name] == name
    end
  end

end