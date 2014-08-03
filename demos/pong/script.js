$(document).ready(function(){
	Imagine({
		element: $('#ball'),
		dirH:1,
		dirV:1,
		update: function(){
			var speed = 100; 
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
});