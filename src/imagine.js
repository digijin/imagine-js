// (function(test){
// 	console.log(test);//asd
// })("asd")

var Imagine = function(params){
	Imagine.engine.registerObject(params);
	if(params.start){
		params.start();
	}
	if(params.update){
		params.update();
	}
	// console.log(Imagine.engine.registerObject);
	// var test = "asd";
}
Imagine.objects = [];

Imagine.time = {
	deltaTime: 0,
	currentTime: 0,
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
			updateId = setInterval(update, frameGap);
		}
	}
	var updateId;
	var update = function(){
		//console.log("updating");
		Imagine.objects.forEach(function(obj){
			//console.log(obj);
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
		}
	}
}();
