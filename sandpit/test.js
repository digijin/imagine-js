$(document).ready(function(){
	Imagine.engine.setFPS(10)
	var obj = {
		start:function(){
			console.log(this);
		},
		update:function(){
			//console.log(Imagine.engine.getFPS());
		}
	};
	Imagine(obj)
})