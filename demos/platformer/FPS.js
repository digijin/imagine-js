(function() {
  window.FPS = function() {
    return {
      lastFPS: [],
      update: function() {
        var fps, reading, _i, _len, _ref;
        this.lastFPS.push(1 / Imagine.time.deltaTime);
        if (this.lastFPS.length > 10) {
          fps = 0;
          _ref = this.lastFPS;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            reading = _ref[_i];
            fps += reading;
          }
          fps = Math.floor(fps / this.lastFPS.length);
          this.lastFPS = [];
          return $(this.element.raw).html(fps + "FPS");
        }
      }
    };
  };

}).call(this);
