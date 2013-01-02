# encoding: utf-8

class Tema
	
	def self.all
    [
      {
        :name => "estadio",
        :label => "Estádios e Arenas",
        :label_html => "Est&aacute;dios e Arenas"
      },
      {
        :name => "aeroporto",
        :label => "Aeroportos",
        :label_html => "Aeroportos"
      },
      {
        :name => "mobilidade_urbana",
        :label => "Mobilidade Urbana",
        :label_html => "Mobilidade Urbana"
      },
      {
        :name => "desenvolvimento_turistico",
        :label => "Desenvolvimento Turístico",
        :label_html => "Desenvolvimento Tur&iacute;stico"
      },
      {
        :name => "porto",
        :label => "Porto",
        :label_html => "Porto"
      },
      {
        :name => "seguranca",
        :label => "Segurança",
        :label_html => "Seguran&ccedil;a"
      }
    ]
  end

  def self.get name
    self.all.select { |tema| tema[:name] == name }
  end

  def self.cidades_sede
    [
      {
        :name => "brasilia",
        :label => "Brasília",
        :label_html => "Bras&iacute;lia"
      },
      {
        :name => "cuiaba",
        :label => "Cuiabá",
        :label_html => "Cuiab&aacute;"
      },
      {
        :name => "belo_horizonte",
        :label => "Belo Horizonte",
        :label_html => "Belo Horizonte"
      },
      {
        :name => "manaus",
        :label => "Manaus",
        :label_html => "Manaus"
      },
      {
        :name => "fortaleza",
        :label => "Fortaleza",
        :label_html => "Fortaleza"
      },
      {
        :name => "natal",
        :label => "Natal",
        :label_html => "Natal"
      },
      {
        :name => "recife",
        :label => "Recife",
        :label_html => "Recife"
      },
      {
        :name => "rio_de_janeiro",
        :label => "Rio de Janeiro",
        :label_html => "Rio de Janeiro"
      },
      {
        :name => "sao_paulo",
        :label => "São Paulo",
        :label_html => "S&atilde;o Paulo"
      },
      {
        :name => "porto_alegre",
        :label => "Porto Alegre",
        :label_html => "Porto Alegre"
      },
      {
        :name => "salvador",
        :label => "Salvador",
        :label_html => "Salvador"
      },
      {
        :name => "curitiba",
        :label => "Curitiba",
        :label_html => "Curitiba"
      }
    ]
  end

  def self.get_cidade_sede name
    self.cidades_sede.select { |cidade_sede| cidade_sede[:name] == name }
  end

end