(function() {
  window.Dying = function() {
    return {
      dirV: -1,
      timer: 3,
      update: function() {
        this.timer -= Imagine.Time.deltaTime;
        this.dirV += Imagine.Time.deltaTime * 10;
        this.element.move(0, this.dirV);
        if (this.timer <= 0) {
          $(this.element).remove();
          return Imagine.destroy(this);
        }
      }
    };
  };

}).call(this);
