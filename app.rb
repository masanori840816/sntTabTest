require 'sass'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/reloader'
require 'slim'

class MainApp < Sinatra::Base
	configure :development do
		register Sinatra::Reloader
	end
	get '/' do
		@intTabNum = params[:tab].to_i
		@intLastRightTabNum = params[:lrt].to_i
		# 右のタブ番号の最低値は2
		if @intLastRightTabNum < 2
			@intLastRightTabNum = 2
		end
		@updateTabs = "loadTabs(" + @intTabNum.to_s + ", " + @intLastRightTabNum.to_s + ");"
		slim :viewTab
	end
	get '/css/stylesheet.css' do
		sass :'css/stylesheet'
	end
	get '/async/:name' do
		File.open("public/html/" + params[:name].to_s)
	end
end
