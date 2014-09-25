(function() {
  $(document).ready(function() {
    var addBlock, addEnemy, player, scene, x, y, _i, _j, _ref, _ref1;
    player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
    Imagine($('#floor')[0]).addComponent(Imagine.collider());
    scene = Imagine($('#scene')[0]).getComponent("element");
    addEnemy = function(x, y, enemy) {
      var en, id;
      id = 'enemy' + x + '_' + y;
      $("#wrapper").append('<div class="enemy" id="' + id + '"></div>');
      en = $("#" + id);
      en.css("left", 100 + (x * 60)).css("top", y * 60);
      return Imagine(en[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Enemy());
    };
    addBlock = function(x, y, block) {
      var id;
      id = 'autoblock' + x + '_' + y;
      $("#wrapper").append('<div class="brick" id="' + id + '"></div>');
      $("#" + id).css("left", 100 + (x * 60)).css("top", y * 60);
      return Imagine($("#" + id)[0]).addComponent(Imagine.collider());
    };
    for (x = _i = 0, _ref = level1.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      for (y = _j = 0, _ref1 = level1[x].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
        if (level1[x][y]) {
          switch (level1[x][y]) {
            case 1:
              addBlock(x, y, level1[x][y]);
              break;
            case 2:
              addEnemy(x, y, 1);
          }
        }
      }
    }
    return Imagine($('#FPS')[0]).addComponent(FPS());
  });

}).call(this);
