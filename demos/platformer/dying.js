(function() {
  window.Dying = function() {
    return {
      name: 'dying',
      dirV: -1,
      dirH: 0,
      timer: 3,
      update: function() {
        this.timer -= Imagine.time.deltaTime;
        this.dirV += Imagine.time.deltaTime * 10;
        this.element.move(this.dirH, this.dirV);
        if (this.timer <= 0) {
          $(this.element.raw).remove();
          return Imagine.destroy(this);
        }
      }
    };
  };

}).call(this);
