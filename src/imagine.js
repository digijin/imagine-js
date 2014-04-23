
var Imagine = function(params){
	Imagine.engine.registerObject(params);
	if(params.start){
		params.start();
	}
}
Imagine.objects = [];

Imagine.time = {
	deltaTime: 0,
	currentTime: 0,
	lastTime: 0,
	startTime: 0
}

Imagine.engine = function(){
	var fps = 12;
	var frameGap = 1000/fps;
	var inited = false;
	var init = function(){
		if(!inited){
			inited = true;
			var d = new Date();
			Imagine.time.startTime = d.getTime();
			Imagine.time.lastTime = Imagine.time.startTime;
			updateId = setInterval(update, frameGap);
		}
	}
	var updateId;
	var update = function(){
		//update time;
		var d = new Date();
		var dt = d.getTime();
		Imagine.time.currentTime = dt - Imagine.time.startTime;
		// console.log(Imagine.time.currentTime);
		// console.log(Imagine.time.lastTime);
		Imagine.time.deltaTime = (Imagine.time.lastTime - Imagine.time.startTime)/1000;
		Imagine.time.lastTime = dt;

		Imagine.objects.forEach(function(obj){
			//console.log(obj);
			//todo: set script execution order
			if(obj.update){
				obj.update();
			}
		})
	};
	init();

	return {
		'reset': function(){
			Imagine.objects = [];
			inited = false;
			init();
		},
		'registerObject':function(obj){
			//console.log("registering");
			Imagine.objects.push(obj);
		},
		forceUpdate: update
	}
}();
