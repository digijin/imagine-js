
var Imagine = function(params){
	Imagine.engine.registerObject(params);
	if(params.start){
		params.start();
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
