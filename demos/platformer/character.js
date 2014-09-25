(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Character = function() {
    return {
      name: 'character',
      speed: 200,
      dirV: 0,
      dirH: 0,
      jumpPower: 4,
      walkSpeed: 2,
      gravity: 9,
      maxFallSpeed: 4,
      coll: void 0,
      sideColl: void 0,
      faceLeft: function() {
        return $(this.element).addClass('flipH');
      },
      faceRight: function() {
        return $(this.element).removeClass('flipH');
      },
      start: function() {
        this.element = this.getComponent('element');
        this.collider = this.getComponent('collider');
      },
      update: function() {
        var x, y;
        this.dirV += this.gravity * Imagine.Time.deltaTime;
        x = this.dirH * this.walkSpeed * Imagine.Time.deltaTime * this.speed;
        y = this.dirV * Imagine.Time.deltaTime * this.speed;
        this.sideColl = this.collider.move(x, 0);
        if (this.sideColl) {
          this.notify('sideColl', this.sideColl);
        }
        this.coll = this.collider.move(0, y);
        if (this.coll && this.coll.side) {
          if (__indexOf.call(this.coll.side, "top") >= 0) {
            this.dirV = 0;
          }
          if (__indexOf.call(this.coll.side, "bottom") >= 0) {
            this.dirV = 0;
          }
        }
        return this.coll;
      },
      jump: function() {
        if (this.coll && this.dirV === 0) {
          if (__indexOf.call(this.coll.side, "top") >= 0) {
            return this.dirV = -this.jumpPower;
          }
        }
      }
    };
  };

}).call(this);
