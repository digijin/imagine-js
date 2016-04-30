(function() {
  var Person, View;
  var engine = new Imagine();
  View = (function() {
    function View() {}

    View.prototype.update = function() {
      return canvas.renderAll();
    };

    return View;

  })();

  Person = (function() {
    function Person() {}

    Person.prototype.x = 0;

    Person.prototype.y = 0;

    Person.prototype.start = function() {
      this.newTarget();
      this.rect = new fabric.Rect({
        left: 100,
        top: 100,
        stroke: 'red',
        fill: 'rgba(0,0,0,0)',
        width: 10,
        height: 10
      });
      return canvas.add(this.rect);
    };

    Person.prototype.newTarget = function() {
      return this.target = {
        x: Math.random() * 300,
        y: Math.random() * 300
      };
    };

    Person.prototype.update = function() {
      var dir, dx, dy;
      dx = this.x - this.target.x;
      dy = this.y - this.target.y;
      dir = [dx < 0 ? 1 : -1, dy < 0 ? 1 : -1];
      if (Math.abs(this.x - this.target.x) < 1) {
        dir[0] = 0;
      }
      if (Math.abs(this.y - this.target.y) < 1) {
        dir[1] = 0;
      }
      if (dir[0] === 0 && dir[1] === 0) {
        this.newTarget();
      }
      this.x += dir[0];
      this.y += dir[1];
      return this.draw();
    };

    Person.prototype.draw = function() {
      this.rect.left = this.x;
      return this.rect.top = this.y;
    };

    return Person;

  })();

  $(document).ready(function() {
    window.canvas = new fabric.Canvas('stage');
    engine.register(new View());
    engine.register(new Person());
    return engine.register($('#fps')[0]).addComponent(new Imagine.FPS());
  });

  window.addPerson = function(num) {
    var _i, _results;
    if (!num) {
      num = 1;
    }
    _results = [];
    for (_i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--) {
      _results.push(engine.register(new Person()));
    }
    return _results;
  };

}).call(this);
