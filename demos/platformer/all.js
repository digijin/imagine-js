(function() {
  window.levelparser = {
    parse: function(str) {
      var block, layer, layers, out, x, y, _i, _j, _len, _len1;
      out = [];
      layers = str.split('\n');
      y = 0;
      for (_i = 0, _len = layers.length; _i < _len; _i++) {
        layer = layers[_i];
        x = 0;
        for (_j = 0, _len1 = layer.length; _j < _len1; _j++) {
          block = layer[_j];
          if (!out[x]) {
            out.push([]);
          }
          out[x].push(parseInt(block));
          x++;
        }
        y++;
      }
      return out;
    }
  };

}).call(this);
;
level1 = levelparser.parse(
"                                                                             \n" +
"      4        2  1  1111    1   1    11                                     \n" +
"               1111          11 11 1 1  1                                    \n" +
"                             1 1 1    11        111                          \n" +
"             11     2        1   1 1   1                       3         6   \n" +
"        5           11  5    1   1 1  1      1       1    5                  \n" +
"  1                       1                 11 2 2 2 11                      ");;
(function() {
  window.Block = function() {
    return {
      name: 'block',
      life: 1,
      indestructable: false,
      damage: function() {
        this.life -= 1;
        if (this.life <= 0) {
          return this.die();
        }
      },
      die: function() {
        var el, frag, i, _i;
        el = this.getComponent('element');
        Imagine.destroy(this);
        for (i = _i = 1; _i <= 4; i = ++_i) {
          frag = $('<div class="brickFrags"></div>');
          $('#wrapper').append(frag);
          frag.css('left', $(el).css('left'));
          frag.css('top', $(el).css('top'));
          frag = Imagine(frag[0]).addComponent(Dying()).getComponent('dying');
          frag.dirH = (Math.random() - .5) * 4;
          frag.dirV = (Math.random() - .5) * 4;
        }
        return $(el).remove();
      }
    };
  };

}).call(this);
;
(function() {
  window.Castle = function() {
    return {
      name: 'castle',
      start: function() {},
      update: function() {}
    };
  };

}).call(this);
;
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
            this.notify('topColl', this.coll);
          }
          if (__indexOf.call(this.coll.side, "bottom") >= 0) {
            this.dirV = 0;
            this.notify('bottomColl', this.coll);
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
;
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Player = function() {
    return {
      name: "player",
      dirH: 0,
      start: function() {
        this.char = this.getComponent('character');
      },
      update: function() {
        var h, left, scrLeft;
        left = this.char.element.offsetLeft;
        scrLeft = 400 - scene.offsetLeft;
        if (left > scrLeft) {
          scene.move(scrLeft - left, 0);
        }
        if (left < scrLeft && scene.offsetLeft < 0) {
          scene.move(scrLeft - left, 0);
        }
        h = Imagine.Input.getAxis('Horizontal');
        if (Imagine.Input.getKey('shift')) {
          h *= 2;
        }
        this.dirH = (this.dirH + h) / 2;
        this.char.dirH = this.dirH;
        if (h < 0) {
          this.char.faceLeft();
        }
        if (h > 0) {
          this.char.faceRight();
        }
        if (Imagine.Input.getKeyDown('up')) {
          return this.char.jump();
        }
      },
      die: function() {
        var el;
        Imagine(Announce("GAME OVER<br /><sub>(esc to restart)</sub>"));
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el).addComponent(Dying());
      },
      onCollision: function(coll) {
        var block;
        if (coll && coll.side) {
          if (__indexOf.call(coll.side, "bottom") >= 0) {
            block = coll.collider.getComponent('block');
            if (block) {
              return block.damage();
            }
          }
        }
      },
      topColl: function(coll) {
        var en;
        if (coll.collider) {
          en = coll.collider.getComponent('enemy');
          if (en) {
            en.damage();
            return this.char.jump();
          }
        }
      },
      bottomColl: function(coll) {},
      sideColl: function(coll) {
        var en, fw, i, l, _i, _results;
        if (coll.collider) {
          en = coll.collider.getComponent('enemy');
          if (en) {
            this.die();
          }
          if (coll.collider.hasTag('castle')) {
            Imagine(Announce("You Win!"));
            _results = [];
            for (i = _i = 1; _i <= 3; i = ++_i) {
              fw = $('<div class="firework"></div>');
              $('#wrapper').append(fw);
              Imagine(fw).addComponent(Firework());
              l = parseInt($(this.element).css('left'));
              l += (Math.random() - 0.5) * 600;
              fw.css('left', l);
              _results.push(fw.css('top', Math.random() * 200));
            }
            return _results;
          }
        }
      }
    };
  };

}).call(this);
;
(function() {
  window.Enemy = function() {
    return {
      name: "enemy",
      life: 1,
      start: function() {
        this.char = this.getComponent('character');
        this.char.walkSpeed = .5;
        return this.char.dirH = 1;
      },
      damage: function() {
        this.life -= 1;
        if (this.life <= 0) {
          return this.die();
        }
      },
      die: function() {
        var el;
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el).addComponent(Dying());
      },
      update: function() {}
    };
  };

}).call(this);
;
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Turtle = function() {
    return {
      start: function() {
        return this.char = this.getComponent('character');
      },
      sideColl: function(coll) {
        if (coll) {
          if (__indexOf.call(coll.side, "left") >= 0) {
            this.char.dirH = -1;
            this.char.faceLeft();
          }
          if (__indexOf.call(coll.side, "right") >= 0) {
            this.char.dirH = 1;
            return this.char.faceRight();
          }
        }
      }
    };
  };

}).call(this);
;
(function() {
  window.Bowser = function() {
    return {
      start: function() {
        this.char = this.getComponent('character');
        this.char.jumpPower = 3;
        this.en = this.getComponent('enemy');
        this.en.life = 3;
        this.startpos = this.element.offsetLeft;
        return this.phase = 0;
      },
      update: function() {
        var diff;
        switch (this.phase) {
          case 0:
            this.char.dirH = 1;
            diff = this.element.offsetLeft - this.startpos;
            if (diff > 200) {
              this.phase = 1;
              return this.char.jump();
            }
            break;
          case 1:
            this.char.dirH = 0;
            if (this.char.dirV === 0) {
              return this.phase = 2;
            }
            break;
          case 2:
            this.char.dirH = -1;
            diff = this.element.offsetLeft - this.startpos;
            if (diff < 0) {
              this.phase = 3;
              return this.char.jump();
            }
            break;
          case 3:
            this.char.dirH = 0;
            if (this.char.dirV === 0) {
              return this.phase = 0;
            }
        }
      }
    };
  };

}).call(this);
;
(function() {
  window.Dying = function() {
    return {
      name: 'dying',
      dirV: -1,
      dirH: 0,
      timer: 3,
      update: function() {
        this.timer -= Imagine.Time.deltaTime;
        this.dirV += Imagine.Time.deltaTime * 10;
        this.element.move(this.dirH, this.dirV);
        if (this.timer <= 0) {
          $(this.element).remove();
          return Imagine.destroy(this);
        }
      }
    };
  };

}).call(this);
;
(function() {
  window.Announce = function(msg) {
    return {
      start: function() {
        return $('#wrapper').append('<div class="announce">' + msg + '</div>');
      }
    };
  };

}).call(this);
;
(function() {
  window.Firework = function() {
    return {
      name: "firework"
    };
  };

}).call(this);
;
(function() {
  window.FPS = function() {
    return {
      lastFPS: [],
      update: function() {
        var fps, reading, _i, _len, _ref;
        this.lastFPS.push(1 / Imagine.Time.deltaTime);
        if (this.lastFPS.length > 10) {
          fps = 0;
          _ref = this.lastFPS;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            reading = _ref[_i];
            fps += reading;
          }
          fps = Math.floor(fps / this.lastFPS.length);
          this.lastFPS = [];
          return $(this.element).html(fps + "FPS");
        }
      }
    };
  };

}).call(this);
;
(function() {
  $(document).ready(function() {
    var addBlock, addEnemy, initLevel, initPlayer, initScene;
    initPlayer = function() {
      var player;
      $('#wrapper').append('<div id="player"></div><div id="floor"></div>');
      player = Imagine($('#player')[0]).addComponent(new Imagine.Collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
      return Imagine($('#floor')[0]).addComponent(new Imagine.Collider());
    };
    addEnemy = function(x, y, enemy) {
      var en, id, im;
      id = 'enemy' + x + '_' + y;
      $("#wrapper").append('<div class="enemy ' + enemy + '" id="' + id + '"></div>');
      en = $("#" + id);
      en.css("left", 100 + (x * 60)).css("top", y * 60);
      im = Imagine(en[0]).addComponent(new Imagine.Collider()).addComponent(Character()).addComponent(Enemy());
      switch (enemy) {
        case 'turtle':
          return im.addComponent(Turtle());
        case 'bowser':
          return im.addComponent(Bowser());
      }
    };
    addBlock = function(x, y, block) {
      var coll, id;
      id = 'autoblock' + x + '_' + y;
      $("#wrapper").append('<div class="' + block + '" id="' + id + '"></div>');
      $("#" + id).css("left", 100 + (x * 60)).css("top", y * 60);
      coll = Imagine($("#" + id)[0]).addComponent(new Imagine.Collider()).addComponent(Block()).getComponent('collider');
      switch (block) {
        case 'hill':
          return coll.ignoreSides = ['left', 'right', 'bottom'];
        case 'castle':
          coll.isTrigger = true;
          coll.addComponent(Castle());
          return coll.addTag('castle');
      }
    };
    initLevel = function() {
      var x, y, _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = level1.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (y = _j = 0, _ref1 = level1[x].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
            if (level1[x][y]) {
              switch (level1[x][y]) {
                case 1:
                  _results1.push(addBlock(x, y, 'brick'));
                  break;
                case 2:
                  _results1.push(addEnemy(x, y, 'turtle'));
                  break;
                case 3:
                  _results1.push(addEnemy(x, y, 'bowser'));
                  break;
                case 4:
                  _results1.push(addBlock(x, y, 'mbox'));
                  break;
                case 5:
                  _results1.push(addBlock(x, y, 'hill'));
                  break;
                case 6:
                  _results1.push(addBlock(x, y, 'castle'));
                  break;
                default:
                  _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    initScene = function() {
      var scene;
      scene = Imagine($('#scene')[0]).addComponent({
        update: function() {
          if (Imagine.Input.getKeyDown('escape')) {
            return initGame();
          }
        }
      }).getComponent("element");
      return scene.move(-scene.offsetLeft, 0);
    };
    window.initGame = function() {
      Imagine.engine.reset();
      $('#wrapper').html('');
      initPlayer();
      initLevel();
      return initScene();
    };
    return initGame();
  });

}).call(this);
