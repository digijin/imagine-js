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
        Imagine(Announce("GAME OVER<br /><sub>(esc to restart)</sub>"));
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el).addComponent(Dying());
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
      bottomColl: function(coll) {
        var block;
        if (coll.collider) {
          block = coll.collider.getComponent('block');
          if (block) {
            return block.damage();
          }
        }
      },
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
