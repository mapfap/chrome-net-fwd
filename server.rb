require 'sinatra'
require 'colorize'
require 'mechanize'

module Rack
  class CommonLogger
    def call(env)
      # do nothing
      @app.call(env)
    end
  end
end

set :bind, '0.0.0.0'
set :port, 8080

get '/:page' do
  url = params[:page].split("-").map{|x| x.to_i.chr}.join
  agent = Mechanize.new
  agent.pluggable_parser.default = Mechanize::Download
  name = /.*\/(.*\.jpg)/.match(url)[1]
  puts name.green
  agent.get(url).save("./fb/"+name)
end