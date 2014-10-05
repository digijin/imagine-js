(function() {
  var Ball, Player,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Player = function() {
    return {
      name: 'player',
      speed: 200,
      update: function() {
        return this.collider.move(Imagine.Input.getAxis('Horizontal') * Imagine.Time.deltaTime * this.speed, 0);
      }
    };
  };

  Ball = function() {
    return {
      name: 'ball',
      speed: 200,
      dirV: 1,
      dirH: 1,
      update: function() {
        var deltax, deltay;
        deltax = this.dirH * Imagine.Time.deltaTime * this.speed;
        deltay = this.dirV * Imagine.Time.deltaTime * this.speed;
        this.collider.move(deltax, deltay);
        if (this.element.offsetLeft < 0) {
          this.dirH = 1;
        }
        if (this.element.offsetLeft > 600 - 10) {
          this.dirH = -1;
        }
        if (this.element.offsetTop < 0) {
          this.dirV = 1;
        }
        if (this.element.offsetTop > 400 - 10) {
          return this.dirV = -1;
        }
      },
      onCollision: function(coll) {
        if (__indexOf.call(coll.side, 'top') >= 0) {
          return this.dirV = -1;
        }
      }
    };
  };

  $(document).ready(function() {
    Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Player());
    return Imagine($('.ball')[0]).addComponent(Imagine.collider()).addComponent(Ball());
  });

}).call(this);
