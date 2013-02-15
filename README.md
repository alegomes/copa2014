require "dalli"
dc = Dalli::Client.new
dc.flush