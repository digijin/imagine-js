var player;
var playerScore = 0;
var enemyScore = 0;
$(document).ready(function(){

	// Imagine.engine.setFPS(10);

	ball = {
		dirH: 100,
		dirV: -100,
		start: function(){
			this.el = $(this.getComponent("element"));
		},
		update: function(){

			collision = this.getComponent('collider').move(this.dirH * Imagine.Time.deltaTime, this.dirV * Imagine.Time.deltaTime);
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
				this.resetball();
			}
			if(left>this.el.parent().width()-this.el.width()){
				this.resetball();
			}
		},
		resetball: function(){
			this.el.css('left', this.el.parent().width()/2);
			this.el.css('top', this.el.parent().height()/2);
		}
	}


	player = {
		speed: 300,
		update: function(){
			coll = this.getComponent('collider');
			coll.move(0, Imagine.Input.getAxis('Vertical')*-this.speed * Imagine.Time.deltaTime);
		}
	}
	enemy = {
		speed: 100,
		update: function(){
			coll = this.getComponent('collider');
			ball = parseInt($('#ball').css('top'));
			element = $(this.getComponent('element'));
			me = parseInt(element.css('top')) + (element.height() /2);
			if(ball>me){
				coll.move(0, this.speed  * Imagine.Time.deltaTime);
			}else{
				coll.move(0, -this.speed * Imagine.Time.deltaTime);
			}
		}
	}

	Imagine($('#ball')[0])
		.addComponent(Imagine.collider())
		.addComponent(ball);


	Imagine($('#right')[0])
		.addComponent(enemy)
		.addComponent(Imagine.collider());
	Imagine($('#left')[0])
		.addComponent(player)
		.addComponent(Imagine.collider());



});