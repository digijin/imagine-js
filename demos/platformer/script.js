(function() {
  $(document).ready(function() {
    var character, player;
    character = function() {
      return {
        name: 'character',
        speed: 200,
        x: 0,
        y: 0,
        dirV: 0,
        dirH: 0,
        jumpPower: 4,
        gravity: 10,
        maxFallSpeed: 4,
        start: function() {
          this.element = this.getComponent('element');
          this.collider = this.getComponent('collider');
        },
        update: function() {
          var coll, x, y;
          this.dirV += this.gravity * Imagine.Time.deltaTime;
          x = this.dirH * Imagine.Time.deltaTime * this.speed;
          y = this.dirV * Imagine.Time.deltaTime * this.speed;
          coll = this.collider.move(x, y);
          if (coll && coll.side) {
            if (coll.side.indexOf("top" >= 0)) {
              return this.dirV = 0;
            }
          }
        },
        jump: function() {
          if (this.dirV === 0) {
            return this.dirV = -this.jumpPower;
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
    Imagine($('#block')[0]).addComponent(Imagine.collider());
    return Imagine($('#floor')[0]).addComponent(Imagine.collider());
  });

}).call(this);
