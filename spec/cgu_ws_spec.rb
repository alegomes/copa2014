require_relative '../lib/cgu_ws'

describe CguWS do
  let(:ws) { CguWS.new }
  let(:empreendimento) { ws.empreendimentos(10).first }

  context "temas" do
    it "lista" do
      ws.temas.should be_an Array
    end
  end

  context "empreendimentos" do
    it "filtra por tema" do
      empreendimento["tema"]["id"].to_i.should == 10
    end

    it "recurso previsto por empreendimento" do
      response = ws.recursos_previstos(empreendimento["id"])
      response.each do |recurso_previsto|
        recurso_previsto["empreendimento"]["id"].should == empreendimento["id"]
      end
    end
  end

  context "aditivos" do
    it "filtra por execucao financeira" do
      execucao_financeira_id = "10"
      response = ws.aditivos(execucao_financeira_id)
      response.each do |aditivo|
        tem_execucao = aditivo.keys.include?("execucaoFinanceira")
        #tem_execucao.should == true
        if tem_execucao
          aditivo["execucaoFinanceira"]["id"].should == execucao_financeira_id
        end
      end
    end
  end

  context "desembolso" do
    it "filtra por execucao financeira" do
      execucao_financeira_id = "10"
      response = ws.desembolsos(execucao_financeira_id)
      response.each do |desembolso|
        desembolso["execucaoFinanceira"]["id"].should == execucao_financeira_id
      end
    end
  end

  context "execução financeira" do
    it "filtra por empreendimento" do
      response = ws.execucao_financeira(empreendimento["id"])
      response.each do |execucao|
        execucao["empreendimento"]["id"].should == empreendimento["id"]
      end
    end

    it "funciona para todo tipo de empreendimento" do
      response = ws.execucao_financeira("10")
      response.each do |execucao|
        execucao["empreendimento"]["id"].should == "10"
      end
    end
  end

  # context "atualização de dados" do
  #   it "a partir do WS da CGU" do
  #     ws.atualizar_dados
  #   end
  # end
end