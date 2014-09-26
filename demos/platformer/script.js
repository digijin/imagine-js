(function() {
  $(document).ready(function() {
    var addBlock, addEnemy, player, scene, x, y, _i, _j, _ref, _ref1;
    player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
    Imagine($('#floor')[0]).addComponent(Imagine.collider());
    scene = Imagine($('#scene')[0]).getComponent("element");
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
      var id;
      id = 'autoblock' + x + '_' + y;
      $("#wrapper").append('<div class="' + block + '" id="' + id + '"></div>');
      $("#" + id).css("left", 100 + (x * 60)).css("top", y * 60);
      return Imagine($("#" + id)[0]).addComponent(Imagine.collider()).addComponent(Block());
    };
    for (x = _i = 0, _ref = level1.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      for (y = _j = 0, _ref1 = level1[x].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
        if (level1[x][y]) {
          switch (level1[x][y]) {
            case 1:
              addBlock(x, y, 'brick');
              break;
            case 2:
              addEnemy(x, y, 'turtle');
              break;
            case 3:
              addEnemy(x, y, 'bowser');
              break;
            case 4:
              addBlock(x, y, 'mbox');
          }
        }
      }
    }
    return Imagine($('#FPS')[0]).addComponent(FPS());
  });

}).call(this);
