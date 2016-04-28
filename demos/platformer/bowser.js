(function() {
  window.Bowser = function() {
    return {
      start: function() {
        this.char = this.getComponent('character');
        this.char.jumpPower = 3;
        this.en = this.getComponent('enemy');
        this.en.life = 3;
        this.startpos = this.element.offsetLeft;
        return this.phase = 0;
      },
      update: function() {
        var diff;
        switch (this.phase) {
          case 0:
            this.char.dirH = 1;
            diff = this.element.raw.offsetLeft - this.startpos;
            if (diff > 200) {
              this.phase = 1;
              return this.char.jump();
            }
            break;
          case 1:
            this.char.dirH = 0;
            if (this.char.dirV === 0) {
              return this.phase = 2;
            }
            break;
          case 2:
            this.char.dirH = -1;
            diff = this.element.raw.offsetLeft - this.startpos;
            if (diff < 0) {
              this.phase = 3;
              return this.char.jump();
            }
            break;
          case 3:
            this.char.dirH = 0;
            if (this.char.dirV === 0) {
              return this.phase = 0;
            }
        }
      }
    };
  };

}).call(this);
