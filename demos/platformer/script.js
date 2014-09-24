(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(document).ready(function() {
    var Character, Player, hill, num, player, scene, _i;
    Character = function() {
      return {
        name: 'character',
        speed: 200,
        dirV: 0,
        dirH: 0,
        jumpPower: 4,
        walkSpeed: 2,
        gravity: 10,
        maxFallSpeed: 4,
        coll: void 0,
        start: function() {
          this.element = this.getComponent('element');
          this.collider = this.getComponent('collider');
        },
        update: function() {
          var x, y;
          this.dirV += this.gravity * Imagine.Time.deltaTime;
          x = this.dirH * this.walkSpeed * Imagine.Time.deltaTime * this.speed;
          y = this.dirV * Imagine.Time.deltaTime * this.speed;
          this.coll = this.collider.move(x, y);
          if (this.coll && this.coll.side) {
            if (__indexOf.call(this.coll.side, "top") >= 0) {
              this.dirV = 0;
            }
            if (__indexOf.call(this.coll.side, "bottom") >= 0) {
              return this.dirV = 0;
            }
          }
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
    Player = function() {
      return {
        name: "player",
        start: function() {
          this.char = this.getComponent('character');
        },
        update: function() {
          var left, scrLeft;
          left = this.char.element.offsetLeft;
          scrLeft = 400 - scene.offsetLeft;
          if (left > scrLeft) {
            scene.move(scrLeft - left, 0);
          }
          this.char.dirH = Imagine.Input.getAxis('Horizontal');
          if (Imagine.Input.getKey('up')) {
            return this.char.jump();
          }
        }
      };
    };
    player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
    Imagine($('#block1')[0]).addComponent(Imagine.collider());
    Imagine($('#block2')[0]).addComponent(Imagine.collider());
    hill = Imagine($('#block3')[0]).addComponent(Imagine.collider()).getComponent("collider");
    hill.ignoreSides = ["right", "bottom", "left"];
    Imagine($('#floor')[0]).addComponent(Imagine.collider());
    scene = Imagine($('#scene')[0]).getComponent("element");
    for (num = _i = 1; _i <= 10; num = ++_i) {
      $("#wrapper").append('<div class="block" id="autoblock' + num + '">x</div>');
      $("#autoblock" + num).css("left", 1000 + (num * 100)).css("top", Math.random() * 300);
      Imagine($("#autoblock" + num)[0]).addComponent(Imagine.collider());
    }
    return console.log(player);
  });

}).call(this);
