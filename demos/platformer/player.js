(function() {
  window.Player = function() {
    return {
      name: "player",
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

}).call(this);
