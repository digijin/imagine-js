(function() {
  var Ball, Block, Player,
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
          this.dirV = -1;
        }
        if (__indexOf.call(coll.side, 'bottom') >= 0) {
          this.dirV = 1;
        }
        if (__indexOf.call(coll.side, 'left') >= 0) {
          this.dirH = -1;
        }
        if (__indexOf.call(coll.side, 'right') >= 0) {
          return this.dirH = 1;
        }
      }
    };
  };

  Block = function() {
    return {
      name: 'block',
      onCollision: function(coll) {
        console.log("?");
        $(this.element.remove());
        return Imagine.destroy(this);
      }
    };
  };

  $(document).ready(function() {
    var block, x, y, _i, _results;
    Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Player());
    Imagine($('.ball')[0]).addComponent(Imagine.collider()).addComponent(Ball());
    _results = [];
    for (x = _i = 0; _i < 10; x = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = 0; _j < 3; y = ++_j) {
          block = $('<div class="block" />');
          $('#scene').append(block);
          block = Imagine(block[0]).addComponent(Imagine.collider()).addComponent(Block());
          _results1.push(block.element.move(10 + x * 50, 10 + y * 30));
        }
        return _results1;
      })());
    }
    return _results;
  });

}).call(this);
