(function() {
  $(document).ready(function() {
    var Input, Time;
    Time = Imagine.Time;
    Input = Imagine.Input;
    Imagine.engine.setFPS(0);
    Imagine({
      element: $("#ball"),
      start: function() {
        this.element.css("left", this.element.parent().width() * Math.random());
        this.element.css("top", this.element.parent().height() * Math.random());
      },
      dirH: 1,
      dirV: 1,
      update: function() {
        var dt, left, speed, top;
        speed = 200;
        dt = Time.deltaTime;
        left = parseFloat(this.element.css("left"));
        top = parseFloat(this.element.css("top"));
        if (left + this.element.width() >= this.element.parent().width() - 5) {
          if (this.dirH > 0) {
            this.dirH = -this.dirH;
          }
        } else {
          if (left <= 0) {
            if (this.dirH < 0) {
              this.dirH = -this.dirH;
            }
          }
        }
        if (top + this.element.height() >= this.element.parent().height() - 5) {
          if (this.dirV > 0) {
            this.dirV = -this.dirV;
          }
        } else {
          if (top <= 0) {
            if (this.dirV < 0) {
              this.dirV = -this.dirV;
            }
          }
        }
        this.dirV += dt * 0.4;
        if (Input.getKeyDown("left")) {
          this.dirH -= 0.3;
        } else {
          if (Input.getKeyDown("right")) {
            this.dirH += 0.3;
          }
        }
        if (Input.getKeyDown("up")) {
          this.dirV -= 0.3;
        } else {
          if (Input.getKeyDown("down")) {
            this.dirV += 0.3;
          }
        }
        this.element.css("left", left + (dt * this.dirH * speed));
        this.element.css("top", top + (dt * this.dirV * speed));
      }
    });
    Imagine({
      element: $("#output"),
      start: function() {
        this.element.prepend("use arrow keys to change direction<br />");
      },
      keyup: function(keyCode) {
        this.element.prepend("" + keyCode + " released <br />");
      },
      keydown: function(keyCode) {
        this.element.prepend("" + keyCode + " pressed <br />");
      }
    });
  });

}).call(this);
