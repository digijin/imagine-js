$(document).ready(function(){
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
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
});