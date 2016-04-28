(function() {
  var Game, Person, ViewRenderer;

  Game = React.createClass({
    getInitialState: function() {
      return {
        people: []
      };
    },
    render: function() {
      var i, peopleNodes;
      i = 0;
      peopleNodes = this.state.people.map(function(person) {
        return React.createElement(Person, {
          "key": person.key,
          "data": person
        });
      });
      return React.createElement("div", {
        "className": "game"
      }, peopleNodes);
    }
  });

  Person = React.createClass({
    render: function() {
      var styles;
      styles = {
        left: this.props.data.x + "px",
        top: this.props.data.y + "px"
      };
      return React.createElement("div", {
        "className": "person",
        "style": styles
      });
    }
  });

  window.Model = {};

  Model.Person = (function() {
    var keyIndex;

    Person.prototype.name = "person";

    keyIndex = 0;

    Person.prototype.defaults = {
      key: 0,
      x: 0,
      y: 0,
      firstname: "blank",
      lastname: "blank",
      head: "normal"
    };

    Person.prototype.target = {
      x: 0,
      y: 0
    };

    Person.prototype.start = function() {
      return this.newTarget();
    };

    Person.prototype.newTarget = function() {
      return this.target = {
        x: Math.random() * 300,
        y: Math.random() * 300
      };
    };

    function Person(data) {
      if (!data) {
        data = {};
      }
      data.key = keyIndex++;
      this.data = _.extend({}, this.defaults, data);
    }

    Person.prototype.update = function() {
      var dir, dx, dy;
      dx = this.data.x - this.target.x;
      dy = this.data.y - this.target.y;
      dir = [dx < 0 ? 1 : -1, dy < 0 ? 1 : -1];
      if (Math.abs(this.data.x - this.target.x) < 1) {
        dir[0] = 0;
      }
      if (Math.abs(this.data.y - this.target.y) < 1) {
        dir[1] = 0;
      }
      if (dir[0] === 0 && dir[1] === 0) {
        this.newTarget();
      }
      this.data.x += dir[0];
      return this.data.y += dir[1];
    };

    return Person;

  })();

  ViewRenderer = (function() {
    function ViewRenderer() {}

    ViewRenderer.prototype.game = null;

    ViewRenderer.prototype.start = function() {
      return this.game = React.render(React.createElement(Game, null), document.getElementById('content'));
    };

    ViewRenderer.prototype.update = function() {
      var coms, data;
      coms = Imagine.getComponents('person');
      data = coms.map(function(com) {
        return com.data;
      });
      return this.game.setState({
        people: data
      });
    };

    return ViewRenderer;

  })();

  $(document).ready(function() {
    Imagine(new ViewRenderer());
    addPerson();
    return Imagine($('#fps')[0]).addComponent(new Imagine.FPS());
  });

  window.addPerson = function(num) {
    var _i, _results;
    if (!num) {
      num = 1;
    }
    _results = [];
    for (_i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--) {
      _results.push(Imagine(new Model.Person()));
    }
    return _results;
  };

}).call(this);
