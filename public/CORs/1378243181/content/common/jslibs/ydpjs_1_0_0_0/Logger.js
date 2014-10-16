//namespace
window.ydpjs_1_0_0_0 = window.ydpjs_1_0_0_0||{};

(function(wnd){
	
	var Logger = function(name){
		this._name = name;
	}
	
	var p = Logger.prototype;
	
	p._name = null;
	
	Logger.getLogger = function(name){
		return new wnd.ydpjs_1_0_0_0.Logger(name);
	}
	
	p.info = function(message){
		var infoMessage = '[INFO] ';
		
		if(this._name != null){
			infoMessage += this._name + ": ";
		}
		
		infoMessage += message;
		
		try{
			console.log(infoMessage);
		}catch(error){}
	}
	
	wnd.ydpjs_1_0_0_0.Logger = Logger;
	
}(window));