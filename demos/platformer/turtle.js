(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Turtle = function() {
    return {
      start: function() {
        return this.char = this.getComponent('character');
      },
      sideColl: function(coll) {
        if (coll) {
          if (__indexOf.call(coll.side, "left") >= 0) {
            this.char.dirH = -1;
            this.char.faceLeft();
          }
          if (__indexOf.call(coll.side, "right") >= 0) {
            this.char.dirH = 1;
            return this.char.faceRight();
          }
        }
      }
    };
  };

}).call(this);
