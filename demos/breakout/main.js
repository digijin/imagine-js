(function() {
  var engine = new Imagine();
  window.engine = engine;
  var Ball, Block, Player,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Player = function() {
    return {
      name: 'player',
      speed: 200,
      update: function() {
        return this.getComponent('collider').move(engine.input.getAxis('Horizontal') * engine.time.deltaTime * this.speed, 0);
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
        deltax = this.dirH * engine.time.deltaTime * this.speed;
        deltay = this.dirV * engine.time.deltaTime * this.speed;
        this.getComponent('collider').move(deltax, deltay);
        if (this.getComponent('element').raw.offsetLeft < 0) {
          this.dirH = 1;
        }
        if (this.getComponent('element').raw.offsetLeft > 600 - 10) {
          this.dirH = -1;
        }
        if (this.getComponent('element').raw.offsetTop < 0) {
          this.dirV = 1;
        }
        if (this.getComponent('element').raw.offsetTop > 400 - 10) {
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
        $(this.getComponent('element').raw).remove();
        return engine.destroy(this);
      }
    };
  };

  $(document).ready(function docready() {
    var block, x, y, _i, _results;
    engine.register($('#player')[0]).addComponent(new Imagine.Collider()).addComponent(Player());
    engine.register($('.ball')[0]).addComponent(new Imagine.Collider()).addComponent(Ball());
    _results = [];
    for (x = _i = 0; _i < 10; x = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = 0; _j < 3; y = ++_j) {
          block = $('<div class="block" />');
          $('#scene').append(block);
          block = engine.register(block[0]).addComponent(new Imagine.Collider()).addComponent(Block());
          _results1.push(block.getComponent('element').move(10 + x * 50, 10 + y * 30));
        }
        return _results1;
      })());
    }
    return _results;
  });

}).call(this);
