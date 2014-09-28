(function() {
  $(document).ready(function() {
    var addBlock, addEnemy, initLevel, initPlayer, initScene;
    initPlayer = function() {
      var player;
      $('#wrapper').append('<div id="player"></div><div id="floor"></div>');
      player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
      return Imagine($('#floor')[0]).addComponent(Imagine.collider());
    };
    addEnemy = function(x, y, enemy) {
      var en, id, im;
      id = 'enemy' + x + '_' + y;
      $("#wrapper").append('<div class="enemy ' + enemy + '" id="' + id + '"></div>');
      en = $("#" + id);
      en.css("left", 100 + (x * 60)).css("top", y * 60);
      im = Imagine(en[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Enemy());
      switch (enemy) {
        case 'turtle':
          return im.addComponent(Turtle());
        case 'bowser':
          return im.addComponent(Bowser());
      }
    };
    addBlock = function(x, y, block) {
      var coll, id;
      id = 'autoblock' + x + '_' + y;
      $("#wrapper").append('<div class="' + block + '" id="' + id + '"></div>');
      $("#" + id).css("left", 100 + (x * 60)).css("top", y * 60);
      coll = Imagine($("#" + id)[0]).addComponent(Imagine.collider()).addComponent(Block()).getComponent('collider');
      switch (block) {
        case 'hill':
          return coll.ignoreSides = ['left', 'right', 'bottom'];
        case 'castle':
          coll.isTrigger = true;
          coll.addComponent(Castle());
          return coll.addTag('castle');
      }
    };
    initLevel = function() {
      var x, y, _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = level1.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (y = _j = 0, _ref1 = level1[x].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
            if (level1[x][y]) {
              switch (level1[x][y]) {
                case 1:
                  _results1.push(addBlock(x, y, 'brick'));
                  break;
                case 2:
                  _results1.push(addEnemy(x, y, 'turtle'));
                  break;
                case 3:
                  _results1.push(addEnemy(x, y, 'bowser'));
                  break;
                case 4:
                  _results1.push(addBlock(x, y, 'mbox'));
                  break;
                case 5:
                  _results1.push(addBlock(x, y, 'hill'));
                  break;
                case 6:
                  _results1.push(addBlock(x, y, 'castle'));
                  break;
                default:
                  _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    initScene = function() {
      var scene;
      scene = Imagine($('#scene')[0]).addComponent({
        update: function() {
          if (Imagine.Input.getKeyDown('escape')) {
            return initGame();
          }
        }
      }).getComponent("element");
      return scene.move(-scene.offsetLeft, 0);
    };
    window.initGame = function() {
      Imagine.engine.reset();
      $('#wrapper').html('');
      initPlayer();
      initLevel();
      return initScene();
    };
    return initGame();
  });

}).call(this);
