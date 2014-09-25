(function() {
  window.Dying = function() {
    return {
      dirV: -1,
      dirH: 0,
      timer: 3,
      update: function() {
        this.timer -= Imagine.Time.deltaTime;
        this.dirV += Imagine.Time.deltaTime * 10;
        this.element.move(this.dirH, this.dirV);
        if (this.timer <= 0) {
          $(this.element).remove();
          return Imagine.destroy(this);
        }
      }
    };
  };

}).call(this);
