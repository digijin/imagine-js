var player;
$(document).ready(function(){

	collider = function(){
		return {
			name:'collider',
			start: function(){
				this.element = $(this.getComponent('element'));
			},
			collidesWith: function(obj){
				obj = $(obj);
				var top = parseFloat(this.element.css('top'));
				var left = parseFloat(this.element.css('left'));
				var width = this.element.width();
				var height = this.element.height();
				var bottom = top+height;
				var right = left+width;
				var o_top = parseFloat(obj.css('top'));
				var o_left = parseFloat(obj.css('left'));
				var o_width = obj.width();
				var o_height = obj.height();
				var o_bottom = o_top+o_height;
				var o_right = o_left+o_width;

				var outsideH = bottom < o_top ||
					o_bottom < top ;
				var outsideV = right < o_left ||
					o_right < left;

				return !outsideV && !outsideH;

			}
		};
	};

	paddle = function(){
		return {
			name: 'paddle',
			dirV: 0,
			start: function(){
				this.element = $(this.getComponent('element'));
			},
			update: function(){
				var dt = Imagine.Time.deltaTime;
				var speed = 200; 
				var top = parseFloat(this.element.css('top'));
				this.element.css('top' , top +(dt*this.dirV*speed));

				//cap top n bottom
				if(parseFloat(this.element.css('top'))<=0){
					this.element.css('top', 0);					
				}
				if(parseFloat(this.element.css('bottom'))<=0){
					this.element.css('top', this.element.parent().height() - this.element.height() - 1);
				}
				
			}
		};
	};

	playerComponent = {
		name: 'player',
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

	enemyComponent = {
		name: 'enemy',
		start: function(){
			this.paddle = this.getComponent('paddle');
			this.ball = $(Imagine.getComponent('ball').getComponent('element'));
			this.element = $(this.getComponent('element'));
		},
		update: function(){
			var balltop = parseFloat(this.ball.css('top'));
			//console.log(this.element.height());
			var top = parseFloat(this.element.css('top')) + (this.element.height()/2);
			this.paddle.dirV = balltop>top?1:-1;
		}
	};

	ballComponent = {
		name: 'ball',
		dirH:1,
		dirV:1,
		start: function(){
			this.element = $(this.getComponent('element'));
		},
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

			if(Imagine.getComponent('player').getComponent('collider').collidesWith(this.element)){
				this.dirH = 1;
			}
			if(Imagine.getComponent('enemy').getComponent('collider').collidesWith(this.element)){
				this.dirH = -1;
			}

			this.element.css('left', left+(dt*this.dirH*speed));
			this.element.css('top' , top +(dt*this.dirV*speed));


		}
	};


	ball = Imagine($('#ball')[0]).addComponent(ballComponent);
	player = Imagine($('#left')[0]).addComponent(paddle()).addComponent(collider()).addComponent(playerComponent);
	enemy = Imagine($('#right')[0]).addComponent(paddle()).addComponent(collider()).addComponent(enemyComponent);
});