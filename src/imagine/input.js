

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
