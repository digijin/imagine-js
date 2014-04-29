$(document).ready(function(){
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
	Imagine.engine.setFPS(60);
	Imagine({
		el: $('#player'),
		update: function(){
			var dt = Imagine.Time.deltaTime;
			var speed = 100;
			var left = parseFloat(this.el.css('left'));
			left += (dt*speed*Imagine.Input.getAxis("Horizontal"));
			left = left.clamp(1, this.el.parent().width() - this.el.width() - 3);
			this.el.css('left', left);
		}
	});

	Imagine({
		el: $('#enemyGroup'),
		speed: 100,
		downSpeed: 10,
		top: 10,
		topGap: 10,
		stage: "r",
		start: function(){
			this.el.css('top', this.top);
		},
		update: function(){
			var dt = Imagine.Time.deltaTime;
			var left = parseFloat(this.el.css('left'));
			var top = parseFloat(this.el.css('top'));
			switch(this.stage){
				case "r":
					left += (dt*this.speed);
					var max = this.el.parent().width() - this.el.width();
					if(left >= max){
						left = max;
						this.stage = "d";
						this.top += this.topGap;
					}
					this.el.css('left', left);

					break;
				case "d":
					top += (dt*this.downSpeed);
					if(top > this.top){
						top = this.top;
						if(left>100){
							this.stage = "l";
						}else{
							this.stage = "r";
						}
					}
					this.el.css('top', top);
					break;
				case "l":
					left -= (dt*this.speed);
					if(left < 0){
						left = 0;
						this.stage = "d";
						this.top += this.topGap;
					}
					this.el.css('left', left);
					break;
			}
			
		}
	});
});