(function() {
  var engine = new Imagine();
  $(document).ready(function() {
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    engine.time.setFPS(60);
    engine.register({
      el: $("#player"),
      update: function() {
        var dt, left, speed;
        dt = engine.time.deltaTime;
        speed = 100;
        left = parseFloat(this.el.css("left"));
        left += dt * speed * engine.input.getAxis("Horizontal");
        left = left.clamp(1, this.el.parent().width() - this.el.width() - 3);
        this.el.css("left", left);
      }
    });
    engine.register({
      el: $("#enemyGroup"),
      speed: 100,
      downSpeed: 10,
      top: 10,
      topGap: 10,
      stage: "r",
      start: function() {
        this.el.css("top", this.top);
      },
      update: function() {
        var dt, left, max, top;
        dt = engine.time.deltaTime;
        left = parseFloat(this.el.css("left"));
        top = parseFloat(this.el.css("top"));
        switch (this.stage) {
          case "r":
            left += dt * this.speed;
            max = this.el.parent().width() - this.el.width();
            if (left >= max) {
              left = max;
              this.stage = "d";
              this.top += this.topGap;
            }
            return this.el.css("left", left);
          case "d":
            top += dt * this.downSpeed;
            if (top > this.top) {
              top = this.top;
              if (left > 100) {
                this.stage = "l";
              } else {
                this.stage = "r";
              }
            }
            if (top > 200) {
              this.top = 0;
              top = 0;
            }
            return this.el.css("top", top);
          case "l":
            left -= dt * this.speed;
            if (left < 0) {
              left = 0;
              this.stage = "d";
              this.top += this.topGap;
            }
            return this.el.css("left", left);
        }
      }
    });
  });

}).call(this);
