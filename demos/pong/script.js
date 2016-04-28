(function() {
  var Ball, Enemy, Player, boxheight, boxright, enemyScore, paddleheight, player, playerScore;

  player = void 0;

  playerScore = 0;

  enemyScore = 0;

  boxheight = 350;

  boxright = 600;

  paddleheight = 100;

  Ball = (function() {
    function Ball() {}

    Ball.prototype.name = 'ball';

    Ball.prototype.requireComponent = [Imagine.Collider];

    Ball.prototype.dirH = 200;

    Ball.prototype.dirV = -200;

    Ball.prototype.onCollision = function(data) {
      switch (data.side[0]) {
        case "bottom":
          return this.dirV = Math.abs(this.dirV);
        case "top":
          return this.dirV = -Math.abs(this.dirV);
        case "left":
          return this.dirH = -Math.abs(this.dirH);
        case "right":
          return this.dirH = Math.abs(this.dirH);
      }
    };

    Ball.prototype.update = function() {
      var left, pos, top;
      this.collider.move(this.dirH * Imagine.time.deltaTime, this.dirV * Imagine.time.deltaTime);
      pos = this.element.getPosition();
      top = pos.top;
      left = pos.left;
      if (top < 0 && this.dirV < 0) {
        this.dirV *= -1;
      }
      if (top > boxheight && this.dirV > 0) {
        this.dirV *= -1;
      }
      if (left < 0) {
        enemyScore++;
        $("#enemyScore").html(enemyScore);
        this.resetball();
      }
      if (left > boxright) {
        playerScore++;
        $("#playerScore").html(playerScore);
        return this.resetball();
      }
    };

    Ball.prototype.resetball = function() {
      var x, y;
      x = boxright / 2;
      y = boxheight / 2;
      return this.element.moveTo(x, y);
    };

    return Ball;

  })();

  Player = (function() {
    function Player() {}

    Player.prototype.requireComponent = [Imagine.Collider];

    Player.prototype.speed = 300;

    Player.prototype.update = function() {
      return this.collider.move(0, -Imagine.input.getAxis("Vertical") * this.speed * Imagine.time.deltaTime);
    };

    return Player;

  })();

  Enemy = (function() {
    function Enemy() {}

    Enemy.prototype.requireComponent = [Imagine.Collider];

    Enemy.prototype.speed = 130;

    Enemy.prototype.update = function() {
      var ball, ballpos, mepos;
      ball = Imagine.getComponent('ball');
      ballpos = ball.element.getPosition().top;
      mepos = this.element.getPosition().top + (paddleheight / 2);
      if (ballpos > mepos) {
        return this.collider.move(0, this.speed * Imagine.time.deltaTime);
      } else {
        return this.collider.move(0, -this.speed * Imagine.time.deltaTime);
      }
    };

    return Enemy;

  })();

  $(document).ready(function() {
    Imagine($("#ball")[0]).addComponent(new Ball());
    Imagine($("#right")[0]).addComponent(new Enemy());
    return Imagine($("#left")[0]).addComponent(new Player());
  });

}).call(this);
