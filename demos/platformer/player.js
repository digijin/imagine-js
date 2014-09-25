(function() {
  window.Player = function() {
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
        if (Imagine.Input.getKeyDown('up')) {
          return this.char.jump();
        }
      }
    };
  };

}).call(this);
