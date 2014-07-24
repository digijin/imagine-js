

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
