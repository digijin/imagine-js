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
          this.element = $(this.getComponent('element'));
        },
        update: function() {
          this.dirV -= this.gravity * Imagine.Time.deltaTime;
          if (this.y <= 0 && this.dirV <= 0) {
            this.dirV = 0;
            this.y = 0;
          }
          this.element.css('left', this.x += this.dirH * Imagine.Time.deltaTime * this.speed);
          return this.element.css('bottom', this.y += this.dirV * Imagine.Time.deltaTime * this.speed);
        },
        jump: function() {
          if (this.dirV === 0) {
            return this.dirV = this.jumpPower;
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
    return Imagine($('#player')[0]).addComponent(character()).addComponent(player());
  });

}).call(this);
