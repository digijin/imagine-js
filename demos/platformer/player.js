(function() {
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
        Imagine(Announce("PWNED"));
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el).addComponent(Dying());
      },
      topColl: function(coll) {
        var en;
        if (coll.collider) {
          en = coll.collider.getComponent('enemy');
          if (en) {
            en.die();
            return this.char.jump();
          }
        }
      },
      bottomColl: function(coll) {
        var block;
        if (coll.collider) {
          return block = coll.collider.getComponent('block');
        }
      },
      sideColl: function(coll) {
        var en;
        if (coll.collider) {
          en = coll.collider.getComponent('enemy');
          if (en) {
            return this.die();
          }
        }
      }
    };
  };

}).call(this);
