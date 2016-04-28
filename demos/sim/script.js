(function() {
  var Person;

  Person = (function() {
    function Person() {}

    Person.prototype.target = [0, 0];

    Person.prototype.start = function() {
      return this.newTarget();
    };

    Person.prototype.newTarget = function() {
      return this.target = [Math.random() * 300, Math.random() * 300];
    };

    Person.prototype.update = function() {
      var dir, dx, dy, pos;
      pos = this.element.getPosition();
      dx = pos.left - this.target[0];
      dy = pos.top - this.target[1];
      dir = [dx < 0 ? 1 : -1, dy < 0 ? 1 : -1];
      if (Math.abs(pos.left - this.target[0]) < 1) {
        dir[0] = 0;
      }
      if (Math.abs(pos.top - this.target[1]) < 1) {
        dir[1] = 0;
      }
      if (dir[0] === 0 && dir[1] === 0) {
        this.newTarget();
      }
      return this.element.move(dir[0], dir[1]);
    };

    return Person;

  })();

  $(document).ready(function() {
    addPerson();
    return Imagine($('#fps')[0]).addComponent(new Imagine.FPS());
  });

  window.addPerson = function(num) {
    var html, _i, _results;
    if (!num) {
      num = 1;
    }
    _results = [];
    for (_i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--) {
      html = $("<div class='person' />");
      $('#container').append(html);
      _results.push(Imagine(html[0]).addComponent(new Person()).element.move(Math.random() * 300, Math.random() * 300));
    }
    return _results;
  };

}).call(this);
