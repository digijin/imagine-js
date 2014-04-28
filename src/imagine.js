// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
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
		// console.log(Imagine.time.startTime);
		// console.log(Imagine.time.lastTime);
		Imagine.time.deltaTime = (dt - Imagine.time.lastTime)/1000;
		Imagine.time.lastTime = dt;

		Imagine.objects.forEach(function(obj){
			//console.log(obj);
			//todo: set script execution order
			if(obj.update){
				obj.update();
			}
		});
	};
	var clearUpdate = function(){
		clearInterval(updateId);
	}
	init();

	return {
		'reset': function(){
			Imagine.objects = [];
			inited = false;
			clearUpdate();
			init();
		},
		'registerObject':function(obj){
			//console.log("registering");
			Imagine.objects.push(obj);
		},
		forceUpdate: update,
		'getFPS': function(){
			return fps;
		},
		'setFPS': function(newFPS){
			fps = newFPS;
			frameGap = 1000/fps;
			clearUpdate();
			updateId = setInterval(update, frameGap);
		}
	}
}();
