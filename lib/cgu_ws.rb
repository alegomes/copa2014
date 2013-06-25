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
    #self.class.get('/tema')["collection"]["tema"]
    [
      {"id" => TEMA_AEROPORTO         , "descricao" => "aeroporto"                },
      {"id" => TEMA_DESENV_TURISTICO  , "descricao" => "desenvolvimento_turistico"},
      {"id" => TEMA_ESTADIO           , "descricao" => "estadio"                  },
      {"id" => TEMA_MOBILIDADE_URBANA , "descricao" => "mobilidade_urbana"        },
      {"id" => TEMA_AEROPORTO         , "descricao" => "porto"                    },
      {"id" => TEMA_SEGURANCA         , "descricao" => "seguranca"                }
    ]
  end

  def empreendimentos(tema_id)
    self.class.get("/empreendimento?tema=#{tema_id}")["collection"]["empreendimento"]
  end

  def recursos_previstos(empreendimento_id)
    collection = self.class.get("/recursoprevisto?empreendimento=#{empreendimento_id}")["collection"]
    if collection.nil?
      []
    else
      [collection["recursoPrevisto"]].flatten
    end
  end

  def execucao_financeira(empreendimento_id)
    collection = self.class.get("/execucaofinanceira?empreendimento=#{empreendimento_id}")["collection"]
    if collection.nil?
      []
    else
      [collection["execucaoFinanceira"]].flatten
    end
  end

  def aditivos(execucao_financeira_id)
    collection = [self.class.get("/aditivo?execucaofinanceira=#{execucao_financeira_id}")["collection"]["aditivo"]].flatten

    #TODO Remover quando resolver o problema de não filtrar por execucaoFinanceira
    collection.select! do |aditivo|
      if (aditivo.keys.include?("execucaoFinanceira"))
        aditivo["execucaoFinanceira"]["id"] == execucao_financeira_id
      else
        false
      end
    end

    collection
  end

  def desembolsos(execucao_financeira_id)
    collection = self.class.get("/desembolso?execucaofinanceira=#{execucao_financeira_id}")["collection"]
    if collection.nil?
      []
    else
      [collection["desembolso"]].flatten
    end
  end

  def atualizar_dados
    self.temas.each do |tema|
      puts "Tema: #{tema['descricao']}"
      total_previsto = 0
      total_contratado = 0
      total_executado = 0

      self.empreendimentos(tema["id"]).each do |empreendimento|
        puts "Empreendimento: #{empreendimento["id"]} - #{empreendimento["descricao"]}"
        previsto_empreendimento = 0
        contratado_empreendimento = 0
        executado_empreendimento = 0

        # Valor previsto
        self.recursos_previstos(empreendimento["id"]).each do |recurso|
          previsto_empreendimento += recurso["valorRecurso"].to_f
          previsto_empreendimento += recurso["valorRecursoContrapartida"].to_f
        end

        # Valor Contratado e Executado
        self.execucao_financeira(empreendimento["id"]).each do |execucao|

          # Valor contratado
          contratado_empreendimento += execucao["valorContrato"].to_f

          # Aditivos
          contratado_empreendimento += self.aditivo(execucao["id"]).map("valorCedido")

          # Executado
          desembolsos = self.desembolsos(execucao["id"])
          desembolsos.each do |desembolso|
            if desembolso["tipoDesembolso"]["id"] == 1 || desembolso["tipoDesembolso"]["descricao"] == 1
              executado_empreendimento += desembolso["valorDesembolso"]
            end
          end
        end

        emp = {
          tema: tema["descricao"],
          cidade_sede: empreendimento["cidadeSede"]["descricao"].urlize(:convert_spaces => true),
          descricao: empreendimento["descricao"].gsub("'", "\\'"),
          valor_previsto: previsto_empreendimento,
          valor_contratado: contratado_empreendimento,
          valor_executado: executado_empreendimento,
          created_at: Date.today
        }

        #Usar o hash acima no active record pra salvar! =)

      end
    end
  end

end