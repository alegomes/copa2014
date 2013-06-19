require_relative '../lib/cgu_ws'

describe CguWS do
  let(:ws) { CguWS.new }

  context "temas" do
    it "lista" do
      ws.temas["collection"].keys.include?("tema").should == true
    end
  end

  context "empreendimentos" do
    it "lista", slow: true do
      ws.empreendimentos["collection"].keys.include?("empreendimento").should == true
    end

    it "filtra por tema" do
      ws.empreendimentos(10)["collection"]["empreendimento"].each do |empreendimento|
        empreendimento["tema"]["id"].to_i.should == 10
      end
    end
  end
end