(function() {
  $(document).ready(function() {
    var num, player, scene, _i;
    player = Imagine($('#player')[0]).addComponent(Imagine.collider()).addComponent(Character()).addComponent(Player()).getComponent("player");
    Imagine($('#floor')[0]).addComponent(Imagine.collider());
    scene = Imagine($('#scene')[0]).getComponent("element");
    for (num = _i = 1; _i <= 40; num = ++_i) {
      $("#wrapper").append('<div class="brick" id="autoblock' + num + '"></div>');
      $("#autoblock" + num).css("left", 400 + (num * 60)).css("top", Math.floor(Math.random() * 7) * 60);
      Imagine($("#autoblock" + num)[0]).addComponent(Imagine.collider());
    }
    return Imagine($('#FPS')[0]).addComponent(FPS());
  });

}).call(this);
