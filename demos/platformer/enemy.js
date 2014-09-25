(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.Enemy = function() {
    return {
      name: "enemy",
      start: function() {
        this.char = this.getComponent('character');
        this.char.walkSpeed = .5;
        return this.char.dirH = 1;
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
      },
      update: function() {}
    };
  };

}).call(this);
