$(document).ready(function(){
	var engine = new Imagine();
	engine.time.setFPS(10)
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
