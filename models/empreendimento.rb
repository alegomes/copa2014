# encoding: utf-8

class Empreendimento < ActiveRecord::Base

  def to_hash
    {
      valor_previsto: format("%.2f", valor_previsto).to_f,
      valor_contratado: format("%.2f", valor_contratado).to_f,
      valor_executado: format("%.2f", valor_executado).to_f,
      data: created_at.strftime("%d/%m/%y")
    }
  end

end