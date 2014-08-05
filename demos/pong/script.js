var player;
$(document).ready(function(){

	paddle = {
		name: 'paddle',
		element: $('#left'),
		dirV: 0,
		update: function(){
				
				var dt = Imagine.Time.deltaTime;
				var speed = 200; 
				var top = parseFloat(this.element.css('top'));
				this.element.css('top' , top +(dt*this.dirV*speed));
		}
	};

	player = {
		start: function(){
			this.paddle = this.getComponent('paddle');
		},
		update: function(){
			this.paddle.dirV = 0;
			if(Imagine.Input.getKey("up")){
				this.paddle.dirV -= 3;
			}else if(Imagine.Input.getKey("down")){
				this.paddle.dirV += 3;
			}
		}
	};


	Imagine({
		element: $('#ball'),
		dirH:1,
		dirV:1,
		update: function(){
			var speed = 200; 
			var dt = Imagine.Time.deltaTime;
			var left = parseFloat(this.element.css('left'));
			var top = parseFloat(this.element.css('top'));

			if(left + this.element.width() >= this.element.parent().width()-5){
				if(this.dirH>0)
					this.dirH = -this.dirH;
			}else if(left <=0){
				if(this.dirH<0)
					this.dirH = -this.dirH;
			} //HIT SIDE WALLS

			if(top + this.element.height() >= this.element.parent().height()-5){
				if(this.dirV>0)
					this.dirV = -this.dirV;
			}else if(top <=0){
				if(this.dirV<0)
					this.dirV = -this.dirV;
			} //HIT TOP OR BOTTOM

			this.element.css('left', left+(dt*this.dirH*speed));
			this.element.css('top' , top +(dt*this.dirV*speed));
		}
	});


	Imagine({}).addComponent(paddle).addComponent(player);

});