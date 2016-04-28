(function() {
  var Character, Enemy, Game, Pickup, Player, blockSize, map,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  map = ['1111111111111111111', '1        1        1', '1 11 111 1 111 11 1', '1                 1', '1 11 1 11111 1 11 1', '1    1   1   1    1', '1111 111 1 111 1111', '1111 1       1 1111', '1111 1 11111 1 1111', '       11111       ', '1111 1 11111 1 1111', '1111 1       1 1111', '1111 1 11111 1 1111', '1        1        1', '1 11 111 1 111 11 1', '1  1           1  1', '11 1 1 11111 1 1 11', '1    1   1   1    1', '1 111111 1 111111 1', '1                 1', '1111111111111111111'];

  blockSize = 16;

  Character = (function() {
    function Character() {}

    Character.prototype.name = 'character';

    Character.prototype.start = function() {
      this.current = {
        x: 1,
        y: 1
      };
      this.offset = {
        x: 0,
        y: 0
      };
      this.dir = {
        x: 0,
        y: 0
      };
      this.speed = 4;
      return this.setPosition();
    };

    Character.prototype.setPosition = function() {
      return this.element.setPosition(blockSize * (this.current.x + this.offset.x), blockSize * (this.current.y + this.offset.y));
    };

    Character.prototype.isBlock = function(x, y) {
      return map[y][x] === "1";
    };

    Character.prototype.newNode = function() {
      this.current = {
        x: Math.round(this.current.x + this.offset.x),
        y: Math.round(this.current.y + this.offset.y)
      };
      this.offset = {
        x: 0,
        y: 0
      };
      return this.checkNewDirection();
    };

    Character.prototype.detectPickup = function() {
      var pickup, pickups, _i, _len, _results;
      pickups = Imagine.getComponents('pickup');
      _results = [];
      for (_i = 0, _len = pickups.length; _i < _len; _i++) {
        pickup = pickups[_i];
        if (this.collider.collidesWith(pickup.element.raw)) {
          pickup.element.raw.parentNode.removeChild(pickup.element.raw);
          _results.push(Imagine.destroy(pickup));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Character.prototype.checkNewDirection = function() {
      if (Imagine.input.isDown('left')) {
        if (!this.isBlock(this.current.x - 1, this.current.y)) {
          this.dir = {
            x: -1,
            y: 0
          };
        }
      }
      if (Imagine.input.isDown('right')) {
        if (!this.isBlock(this.current.x + 1, this.current.y)) {
          this.dir = {
            x: 1,
            y: 0
          };
        }
      }
      if (Imagine.input.isDown('up')) {
        if (!this.isBlock(this.current.x, this.current.y - 1)) {
          this.dir = {
            x: 0,
            y: -1
          };
        }
      }
      if (Imagine.input.isDown('down')) {
        if (!this.isBlock(this.current.x, this.current.y + 1)) {
          return this.dir = {
            x: 0,
            y: 1
          };
        }
      }
    };

    Character.prototype.detectTurnAround = function() {
      if (this.dir.x === 1) {
        if (Imagine.input.isDown('left')) {
          this.dir = {
            x: -1,
            y: 0
          };
        }
      } else if (this.dir.x === -1) {
        if (Imagine.input.isDown('right')) {
          this.dir = {
            x: 1,
            y: 0
          };
        }
      }
      if (this.dir.y === 1) {
        if (Imagine.input.isDown('up')) {
          console.log("?");
          return this.dir = {
            x: 0,
            y: -1
          };
        }
      } else if (this.dir.y === -1) {
        if (Imagine.input.isDown('down')) {
          return this.dir = {
            x: 0,
            y: 1
          };
        }
      }
    };

    Character.prototype.update = function() {
      if (Imagine.input.isDown('enter')) {
        debugger;
      }
      if (this.dir.x === 0 && this.dir.y === 0) {
        this.checkNewDirection();
      }
      this.offset.x += this.dir.x * Imagine.time.deltaTime * this.speed;
      this.offset.y += this.dir.y * Imagine.time.deltaTime * this.speed;
      if (Math.abs(this.offset.x) > 1 || Math.abs(this.offset.y) > 1) {
        this.newNode();
      }
      this.detectTurnAround();
      if (this.offset.x < 0) {
        if (this.isBlock(this.current.x - 1, this.current.y)) {
          this.offset.x = 0;
          this.checkNewDirection();
        }
      } else if (this.offset.x > 0) {
        if (this.isBlock(this.current.x + 1, this.current.y)) {
          this.offset.x = 0;
          this.checkNewDirection();
        }
      }
      if (this.offset.y < 0) {
        if (this.isBlock(this.current.x, this.current.y - 1)) {
          this.offset.y = 0;
          this.checkNewDirection();
        }
      } else if (this.offset.y > 0) {
        if (this.isBlock(this.current.x, this.current.y + 1)) {
          this.offset.y = 0;
          this.checkNewDirection();
        }
      }
      return this.setPosition();
    };

    return Character;

  })();

  Player = (function(_super) {
    __extends(Player, _super);

    function Player() {
      return Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.update = function() {
      Player.__super__.update.apply(this, arguments);
      return this.detectPickup();
    };

    return Player;

  })(Character);

  Enemy = (function(_super) {
    __extends(Enemy, _super);

    function Enemy() {
      return Enemy.__super__.constructor.apply(this, arguments);
    }

    Enemy.prototype.start = function() {
      Enemy.__super__.start.apply(this, arguments);
      this.current = {
        x: 10,
        y: 1
      };
      return this.setPosition();
    };

    Enemy.prototype.checkNewDirection = function() {
      var dirs;
      dirs = [
        {
          x: 1,
          y: 0
        }, {
          x: -1,
          y: 0
        }, {
          x: 0,
          y: 1
        }, {
          x: 0,
          y: -1
        }
      ];
      dirs = _.filter(dirs, function(item) {
        if (this.isBlock(this.current.x + item.x, this.current.y + item.y)) {
          return false;
        }
        if ((item.x === -this.dir.x) && (item.y === -this.dir.y)) {
          return false;
        }
        return true;
      }, this);
      console.log(this.dir);
      this.dir = _.sample(dirs);
      return console.log(dirs, this.dir);
    };

    Enemy.prototype.detectTurnAround = function() {};

    return Enemy;

  })(Character);

  Pickup = (function() {
    Pickup.prototype.name = 'pickup';

    function Pickup(x, y) {
      this.pos = {
        x: x,
        y: y
      };
    }

    Pickup.prototype.start = function() {
      return this.setPosition();
    };

    Pickup.prototype.setPosition = function() {
      return this.element.setPosition((blockSize * this.pos.x) + 4, (blockSize * this.pos.y) + 4);
    };

    return Pickup;

  })();

  Game = (function() {
    var addCharacter, addEnemy, addPickup, drawBG;

    function Game() {
      this.container = document.getElementById('container');
      drawBG();
      addCharacter();
      addEnemy();
    }

    addCharacter = function() {
      var el;
      el = document.createElement('div');
      el.className = 'pacman';
      this.container.appendChild(el);
      return Imagine(el).addComponent(new Imagine.Collider()).addComponent(new Player());
    };

    addEnemy = function() {
      var el;
      el = document.createElement('div');
      el.className = 'ghost';
      this.container.appendChild(el);
      return Imagine(el).addComponent(new Enemy());
    };

    addPickup = function(x, y) {
      var el;
      el = document.createElement('div');
      el.className = 'pickup';
      this.container.appendChild(el);
      return Imagine(el).addComponent(new Pickup(x, y));
    };

    drawBG = function() {
      var bg, cell, div, name, row, x, y, _i, _j, _len, _len1, _results;
      this.container.style.width = (map[0].length * blockSize) + "px";
      this.container.style.height = (map.length * blockSize) + "px";
      bg = document.createElement('div');
      bg.className = "bg";
      this.container.appendChild(bg);
      y = 0;
      _results = [];
      for (_i = 0, _len = map.length; _i < _len; _i++) {
        row = map[_i];
        x = 0;
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          cell = row[_j];
          div = document.createElement('div');
          bg.appendChild(div);
          name = "open";
          if (cell === "1") {
            name = "block";
          } else {
            addPickup(x, y);
          }
          div.className = name;
          x++;
        }
        _results.push(y++);
      }
      return _results;
    };

    return Game;

  })();

  window.onload = function() {
    return new Game();
  };

}).call(this);
