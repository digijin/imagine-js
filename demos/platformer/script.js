(function() {
  $(document).ready(function() {
    var addBlock, player, scene, x, y, _i, _j, _ref, _ref1;
    player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
    Imagine($('#floor')[0]).addComponent(Imagine.collider());
    scene = Imagine($('#scene')[0]).getComponent("element");
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
          addBlock(x, y, level1[x][y]);
        }
      }
    }
    return Imagine($('#FPS')[0]).addComponent(FPS());
  });

}).call(this);
