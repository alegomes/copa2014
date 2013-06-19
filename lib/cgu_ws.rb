require 'httparty'

class CguWS
  include HTTParty
  base_uri 'http://www.portaldatransparencia.gov.br/copa2014/api/rest'

  TEMA_AEROPORTO = 1
  TEMA_DESENV_TURISTICO = 4
  TEMA_ESTADIO = 6
  TEMA_MOBILIDADE_URBANA = 8
  TEMA_PORTO = 10
  TEMA_SEGURANCA = 14

  def temas
    self.class.get('/tema')
  end

  def empreendimentos(tema_id = nil)
    query_tema = "?tema=#{tema_id}" unless tema_id.nil?
    self.class.get("/empreendimento#{query_tema}")
  end

end