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