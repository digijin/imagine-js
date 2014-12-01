var player;
var playerScore = 0;
var enemyScore = 0;
$(document).ready(function(){

	// Imagine.engine.setFPS(10);

	var ball = {
		dirH: 200,
		dirV: -200,
		start: function(){
			this.el = $(this.getComponent("element"));
			this.coll = this.getComponent('collider');
		},
		update: function(){

			collision = this.coll.move(this.dirH * Imagine.Time.deltaTime, this.dirV * Imagine.Time.deltaTime);
			if(collision){
				if(collision.side.length>0){
					this.dirH *=-1;
				}
			}
			var top = parseInt(this.el.css('top'));
			var left = parseInt(this.el.css('left'));
			if(top<0 && this.dirV<0){
				this.dirV *=-1;
			}
			if(top>this.el.parent().height()-this.el.height() && this.dirV>0){
				this.dirV *=-1;	
			}
			if(left<0){ 
				enemyScore++;
				$('#enemyScore').html(enemyScore)
				this.resetball();
			}
			if(left>this.el.parent().width()-this.el.width()){
				playerScore++;
				$('#playerScore').html(playerScore)
				this.resetball();
			}
		},
		resetball: function(){
			x = this.el.parent().width()/2
			y = this.el.parent().height()/2
			// this.el.css('left', );
			// this.el.css('top', );
			this.el[0].moveTo(x, y)
		}
	}


	player = {
		speed: 300,
		start: function(){
			this.coll = this.getComponent('collider');
		},
		update: function(){
			this.coll.move(0, Imagine.Input.getAxis('Vertical')*-this.speed * Imagine.Time.deltaTime);
		}
	}
	enemy = {
		speed: 150,
		start: function(){
			this.coll = this.getComponent('collider');
			this.el = $(this.getComponent('element'));
		},
		update: function(){
			ball = parseInt($('#ball').css('top'));
			me = parseInt(this.el.css('top')) + (this.el.height() /2);
			if(ball>me){
				this.coll.move(0, this.speed  * Imagine.Time.deltaTime);
			}else{
				this.coll.move(0, -this.speed * Imagine.Time.deltaTime);
			}
		}
	}

	Imagine($('#ball')[0])
		.addComponent(new Imagine.Collider())
		.addComponent(ball);

	Imagine($('#right')[0])
		.addComponent(new Imagine.Collider())
		.addComponent(enemy);

	Imagine($('#left')[0])
		.addComponent(new Imagine.Collider())
		.addComponent(player);



});