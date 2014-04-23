// (function(test){
// 	console.log(test);//asd
// })("asd")

var Imagine = function(params){
	Imagine.engine.registerObject(params);
	// console.log(Imagine.engine.registerObject);
	// var test = "asd";
}
Imagine.reset = function(){
	Imagine.objects = [];
}
Imagine.objects = [];
Imagine.engine = function(){


	return {
		'registerObject':function(obj){
			//console.log("registering");
			Imagine.objects.push(obj);
		}
	}
	// this.registerObject = function(obj){
	// 	console.log("heres an obj");
	// }

}();

var Time = {
	deltaTime: 0,
	currentTime: 0,
	startTime: 0
}