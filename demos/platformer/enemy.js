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
