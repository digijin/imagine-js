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
      },
      topColl: function(coll) {
        var en;
        if (coll.collider) {
          en = coll.collider.getComponent('enemy');
          if (en) {
            return console.log("hit enemy on head");
          }
        }
      },
      bottomColl: function(coll) {
        var block;
        if (coll.collider) {
          return block = coll.collider.getComponent('block');
        }
      }
    };
  };

}).call(this);
