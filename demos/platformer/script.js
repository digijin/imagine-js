(function() {
  $(document).ready(function() {
    var character, hill, player;
    character = function() {
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
            if (this.coll.side.indexOf("top") >= 0) {
              this.dirV = 0;
            }
            if (this.coll.side.indexOf("bottom") >= 0) {
              return this.dirV = 0;
            }
          }
        },
        jump: function() {
          if (this.coll && this.dirV === 0) {
            if (this.coll.side.indexOf("top") >= 0) {
              return this.dirV = -this.jumpPower;
            }
          }
        }
      };
    };
    player = function() {
      return {
        start: function() {
          this.char = this.getComponent('character');
        },
        update: function() {
          this.char.dirH = Imagine.Input.getAxis('Horizontal');
          if (Imagine.Input.getKey('up')) {
            return this.char.jump();
          }
        }
      };
    };
    console.log("ready");
    Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(character()).addComponent(player());
    Imagine($('#block1')[0]).addComponent(Imagine.collider());
    Imagine($('#block2')[0]).addComponent(Imagine.collider());
    hill = Imagine($('#block3')[0]).addComponent(Imagine.collider()).getComponent("collider");
    hill.ignoreSides = ["right", "bottom", "left"];
    return Imagine($('#floor')[0]).addComponent(Imagine.collider());
  });

}).call(this);
