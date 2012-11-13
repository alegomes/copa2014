# encoding: utf-8

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