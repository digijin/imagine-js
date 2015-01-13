player = undefined
playerScore = 0
enemyScore = 0
boxheight = 350
boxright = 600
paddleheight = 100


class Ball
  name: 'ball' # for Imagine.getComponent 'ball'
  requireComponent: [Imagine.Collider]
  dirH: 200
  dirV: -200
  onCollision: (data) ->

    switch data.side[0]
      when "bottom"
        @dirV = Math.abs @dirV
      when "top"
        @dirV = -Math.abs @dirV
      when "left"
        @dirH = -Math.abs @dirH
      when "right"
        @dirH = Math.abs @dirH
  update: ->
    @collider.move @dirH * Imagine.time.deltaTime, @dirV * Imagine.time.deltaTime
    pos = @element.getPosition()
    top = pos.top
    left = pos.left

    # top and bottom walls
    if top < 0 and @dirV < 0
      @dirV *= -1  
    if top > boxheight and @dirV > 0
      @dirV *= -1

    # going out left or right
    if left < 0
      enemyScore++
      $("#enemyScore").html enemyScore
      @resetball()
    if left > boxright
      playerScore++
      $("#playerScore").html playerScore
      @resetball()

  resetball: ->
    x = boxright / 2
    y = boxheight / 2
    
    @element.moveTo x, y


class Player
  requireComponent: [Imagine.Collider]
  speed: 300
  update: -> 
    @collider.move 0, -Imagine.Input.getAxis("Vertical") * @speed * Imagine.time.deltaTime


class Enemy
  requireComponent: [Imagine.Collider]
  speed: 130
  update: ->
    ball = Imagine.getComponent 'ball'
    ballpos = ball.element.getPosition().top
    mepos = @element.getPosition().top + (paddleheight/2)
    if ballpos > mepos
      @collider.move 0, @speed * Imagine.time.deltaTime
    else
      @collider.move 0, -@speed * Imagine.time.deltaTime
        
$(document).ready ->
  Imagine($("#ball")[0]).addComponent new Ball()
  Imagine($("#right")[0]).addComponent new Enemy()
  Imagine($("#left")[0]).addComponent new Player()
