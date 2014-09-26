(function() {
  window.Block = function() {
    return {
      name: 'block',
      life: 1,
      damage: function() {
        this.life -= 1;
        if (this.life <= 0) {
          return this.die();
        }
      },
      die: function() {
        var el, frag, i, _i;
        el = this.getComponent('element');
        Imagine.destroy(this);
        for (i = _i = 1; _i <= 4; i = ++_i) {
          frag = $('<div class="brickFrags"></div>');
          $('#wrapper').append(frag);
          frag.css('left', $(el).css('left'));
          frag.css('top', $(el).css('top'));
          frag = Imagine(frag[0]).addComponent(Dying()).getComponent('dying');
          frag.dirH = (Math.random() - .5) * 4;
          frag.dirV = (Math.random() - .5) * 4;
        }
        return $(el).remove();
      }
    };
  };

}).call(this);
