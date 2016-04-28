(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Player = function() {
    return {
      name: "player",
      dirH: 0,
      start: function() {
        this.char = this.getComponent('character');
      },
      update: function() {
        var h, left, scEl, scrLeft;
        left = this.char.element.raw.offsetLeft;
        scrLeft = 400 - scene.offsetLeft;
        scEl = Imagine.getComponent("scene").getComponent("element");
        if (left > scrLeft) {
          scEl.move(scrLeft - left, 0);
        }
        if (left < scrLeft && scene.offsetLeft < 0) {
          scEl.move(scrLeft - left, 0);
        }
        h = Imagine.input.getAxis('Horizontal');
        if (Imagine.input.getKey('shift')) {
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
        if (Imagine.input.getKeyDown('up')) {
          return this.char.jump();
        }
      },
      die: function() {
        var el;
        Imagine(Announce("GAME OVER<br /><sub>(esc to restart)</sub>"));
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el.raw).addComponent(Dying());
      },
      onCollision: function(coll) {
        var block;
        if (coll && coll.side) {
          if (__indexOf.call(coll.side, "bottom") >= 0) {
            block = coll.collider.getComponent('block');
            if (block) {
              return block.damage();
            }
          }
        }
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
      bottomColl: function(coll) {},
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
              l = parseInt($(this.element.raw).css('left'));
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
