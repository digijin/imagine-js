var player;
var playerScore = 0;
var enemyScore = 0;
$(document).ready(function(){
	paddle = function(){
		return {
			name: 'paddle',
			dirV: 0,
			start: function(){
				this.element = this.getComponent('element');
			},
			update: function(){
				var dt = Imagine.Time.deltaTime;
				var speed = 200; 
				var parentRect = this.element.parentNode.getBoundingClientRect();
				var rect = this.element.getLocalRect();
				var top = rect.top;
				this.element.style.top = top +(dt*this.dirV*speed) + "px";

				//cap top n bottom
				rect = this.element.getLocalRect();
				if(rect.top<=0){
					this.element.style.top = '0px';
				}else if(rect.bottom> parentRect.bottom){
					this.element.style.top = (parentRect.bottom - (rect.bottom - rect.top)) +"px";
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

	enemyComponent = function(){
		return {
			name: 'enemy',
			start: function(){
				this.paddle = this.getComponent('paddle');
				this.ball = $(Imagine.getComponent('ball').getComponent('element'));
				this.element = $(this.getComponent('element'));
			},
			update: function(){
				var balltop = parseFloat(this.ball.css('top'));
				var top = parseFloat(this.element.css('top')) + (this.element.height()/2);
				this.paddle.dirV = balltop>top?1:-1;
			}
		};
	};

	ballComponent = {
		name: 'ball',
		dirH:1,
		dirV:1,
		speed: 200,
		start: function(){
			this.element = $(this.getComponent('element'));
			this.reset();
		},
		reset: function(){
			this.element.css('left', this.element.parent().width()/2);
			this.element.css('top', this.element.parent().height()/2);
			this.speed = 200;
		},
		update: function(){
			var dt = Imagine.Time.deltaTime;
			var left = parseFloat(this.element.css('left'));
			var top = parseFloat(this.element.css('top'));

			this.speed += dt*4;
			

			if(left + this.element.width() >= this.element.parent().width()-5){
				playerScore ++;
				$('#playerScore').html(playerScore);
				this.reset();
				return;
			}else if(left <=0){
				enemyScore ++;
				$('#enemyScore').html(enemyScore);
				this.reset();
				return;
			} //HIT SIDE WALLS

			if(top + this.element.height() >= this.element.parent().height()-5){
				if(this.dirV>0)
					this.dirV = -this.dirV;
			}else if(top <=0){
				if(this.dirV<0)
					this.dirV = -this.dirV;
			} //HIT TOP OR BOTTOM

			if(Imagine.getComponent('player').getComponent('collider').collidesWith(this.element[0])){
				this.dirH = 1;
			}
			if(Imagine.getComponent('enemy').getComponent('collider').collidesWith(this.element[0])){
				this.dirH = -1;
			}

			this.element.css('left', left+(dt*this.dirH*this.speed));
			this.element.css('top' , top +(dt*this.dirV*this.speed));


		}
	};


	var ball = Imagine($('#ball')[0]).addComponent(ballComponent);
	var player = Imagine($('#left')[0]).addComponent(paddle()).addComponent(Imagine.collider()).addComponent(playerComponent);
	var enemy = Imagine($('#right')[0]).addComponent(paddle()).addComponent(Imagine.collider()).addComponent(enemyComponent());
});