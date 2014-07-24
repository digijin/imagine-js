//handle IE console
if (!window.console) console = {log: function() {}};
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());
;

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
;


Imagine.engine = function(){
	var fps = 12;
	var frameGap = 1000/fps;
	var inited = false;
	var init = function(){
		if(!inited){
			inited = true;
			var d = new Date();
			Imagine.Time.startTime = d.getTime();
			Imagine.Time.lastTime = Imagine.Time.startTime;
			updateId = setInterval(update, frameGap);
		}
	};
	var updateId;
	var update = function(){
		//update Time;
		Imagine.Time.update();

		Imagine.Input.update();

		for(var i = 0; i<Imagine.objects.length; i++){
			obj = Imagine.objects[i];
			//todo: set script execution order
			if(obj.update){
				obj.update();
			}
		}
	};
	var clearUpdate = function(){
		clearInterval(updateId);
	};

	setTimeout(init, 0);//run init next frame

	return {
		'reset': function(){
			Imagine.objects = [];
			Imagine.Input.reset();
			inited = false;
			clearUpdate();
			init();
		},
		'registerObject':function(obj){
			//console.log("registering");
			Imagine.objects.push(obj);
		},
		'forceUpdate': update,
		'getFPS': function(){
			return fps;
		},
		'setFPS': function(newFPS){
			fps = newFPS;
			frameGap = 1000/fps;
			clearUpdate();
			updateId = setInterval(update, frameGap);
		}
	};
}();
;


Imagine.Input = function(){

	Imagine.addEvent(document, "keypress", function (e) {
		e = e || window.event;
		// use e.keyCode
		var keyCode =  e.keyCode ? e.keyCode : e.charCode;
		keypress(keyCode);
	});

	Imagine.addEvent(document, "keyup", function (e) {
		e = e || window.event;
		var keyCode =  e.keyCode ? e.keyCode : e.charCode;
		//console.log("up"+keyCode);
		keyup(keyCode);
	});

	Imagine.addEvent(document, "keydown", function (e) {
		e = e || window.event;
		var keyCode =  e.keyCode ? e.keyCode : e.charCode;
		//console.log("down"+keyCode);
		keydown(keyCode);
	});

	var keypress = function(keyCode){
		//console.log(keyCode);
	};

	var keyStatus = {};

	var keyChanging = {};

	var keyChanged = {};

	var keyup = function(keyCode){
		keyCode = map(keyCode);
		keyStatus[keyCode] = false;
		keyChanging[keyCode] = "up";
		for(var i = 0; i<Imagine.objects.length; i++){
			obj = Imagine.objects[i];
			if(obj.keyup){
				obj.keyup(keyCode);
			}
		}
	};

	var keydown = function(keyCode){
		keyCode = map(keyCode);
		if(keyStatus.hasOwnProperty(keyCode)){
			if(keyStatus[keyCode] !== true){
				keyChanging[keyCode] = "down";
			}
		}else{
			keyChanging[keyCode] = "down";
		}
		
		keyStatus[keyCode] = true;
		for(var i = 0; i<Imagine.objects.length; i++){
			obj = Imagine.objects[i];
			if(obj.keydown){
				obj.keydown(keyCode);
			}
		}
	};

	var defaults = {
		axes:{
			"Horizontal": {
				positive: "right",
				negative: "left"
			},
			"Vertical": {
				positive: "up",
				negative: "down"
			}
		},
		mapping: {
			"left": 37,
			"up": 38,
			"right": 39,
			"down": 40
		}
	};

	var axes;

	var init = function(params){
		var config = JSON.parse(JSON.stringify(defaults));	//extend params
		axes = config.axes;
		mapping = config.mapping;
	};

	var reset = function(){
		keyStatus = {};
		keyChanging = {};
		keyChanged = {};
	};

	var mapping;

	var map = function(key){
		if(typeof key === "number"){
			return key;
		}
		if(mapping.hasOwnProperty(key)){
			return mapping[key];
		}
		return parseInt(key);
	};

	var isDown = function(keyCode){
		keyCode = map(keyCode);
		if(keyStatus.hasOwnProperty(keyCode)){
			return keyStatus[keyCode];
		}
		return false;
	};

	var getKeyDown = function(keyCode){
		keyCode = map(keyCode);
		if(keyChanged.hasOwnProperty(keyCode)){
			if(keyChanged[keyCode] == "down"){
				return true;
			}
		}
		return false;
	};

	var getKeyUp = function(keyCode){
		keyCode = map(keyCode);
		if(keyChanged.hasOwnProperty(keyCode)){
			if(keyChanged[keyCode] == "up"){
				return true;
			}
		}
		return false;
	};

	var getAxis = function(axis){
		var pos = isDown(axes[axis].positive);
		var neg = isDown(axes[axis].negative);
		return (pos?1:0) + (neg?-1:0);
	};

	var update = function(){
		keyChanged = keyChanging;
		keyChanging = {};
	};

	// var getAxes = function(){
	// 	return axes
	// }
	init();
	return {
		axes: axes,
		addAxis: function(axisName, axis){
			axes[axisName] = axis;
		},
		keypress: keypress,
		keyup: keyup,
		keydown: keydown,
		map: map,
		isDown: isDown,
		getKey: isDown,
		reset: reset,
		update: update,
		getKeyDown: getKeyDown,
		getKeyUp: getKeyUp,
		getAxis: getAxis
	};
}();
;
Imagine.Time = {
	deltaTime: 0,
	currentTime: 0,
	lastTime: 0,
	startTime: 0,
	update: function(){
		var d = new Date();
		var dt = d.getTime();
		Imagine.Time.currentTime = dt - Imagine.Time.startTime;
		Imagine.Time.deltaTime = (dt - Imagine.Time.lastTime)/1000;
		Imagine.Time.lastTime = dt;
	}
};