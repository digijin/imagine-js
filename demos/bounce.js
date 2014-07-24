$(document).ready(function(){
	Time = Imagine.Time;
	Input = Imagine.Input;
	Imagine.engine.setFPS(0);
	Imagine({
		element: $('#ball'),
		start: function(){
			this.element.css("left", this.element.parent().width()* Math.random());
			this.element.css("top", this.element.parent().height() * Math.random());
		},
		dirH:1,
		dirV:1,
		update: function(){

			var speed = 200; 
			var dt = Time.deltaTime;

			var left = parseFloat(this.element.css('left'));
			var top = parseFloat(this.element.css('top'));

			if(left + this.element.width() >= this.element.parent().width()-5){
				this.dirH = -1;
			}else if(left <=0){
				this.dirH = 1;
			} //HIT SIDE WALLS

			if(top + this.element.height() >= this.element.parent().height()-5){
				this.dirV = -1;
			}else if(top <=0){
				this.dirV = 1;
			} //HIT TOP OR BOTTOM

			this.dirV += dt * 0.4;//gravity

			//a little interaction
			if(Input.getKeyDown("left")){
				this.dirH = -this.dirH;
			}else if(Input.getKeyDown("right")){
				this.dirH = this.dirH;
			}

			//a little interaction
			if(Input.getKeyDown("up")){
				this.dirV = -this.dirH;
			}else if(Input.getKeyDown("down")){
				this.dirV = this.dirH;
			}

			this.element.css('left', left+(dt*this.dirH*speed));
			this.element.css('top' , top +(dt*this.dirV*speed));
			//this.element.css('top', top+Time.deltaTime);
		}
	});
	Imagine({
		element:$("#output"),
		start: function(){
			this.element.prepend("use arrow keys to change direction<br />");
		},
		keyup:function(keyCode){
			//console.log(keyCode);
			this.element.prepend(""+keyCode+" released <br />");
		},
		keydown:function(keyCode){
			//console.log(keyCode);
			this.element.prepend(""+keyCode+" pressed <br />");
		}
	});
});