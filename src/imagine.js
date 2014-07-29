
var Imagine = function(params){
	if( Object.prototype.toString.call( params ) === '[object Array]' ) {
	    for(var i=0; i<params.length; i++){
	    	Imagine(params[i]);
	    }
	}else{
		Imagine.engine.registerObject(params);
		if(params.start){
			params.start();
		}
		if(params.component){
			for (var key in params.component) {
				if (params.component.hasOwnProperty(key)) {
					var obj = params.component[key];
					if(obj.start){
						obj.start();
					}
				}
			}
		}
	}
	
};

Imagine.objects = [];

Imagine.addEvent = function(element, eventName, callback) {
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventName, callback);
	} else {
		element["on" + eventName] = callback;
	}
};
