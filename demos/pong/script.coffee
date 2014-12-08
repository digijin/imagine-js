player = undefined
playerScore = 0
enemyScore = 0
boxheight = 350
boxright = 600
paddleheight = 100
$(document).ready ->
  
  class Ball
    name: 'ball'
    requireComponent: [Imagine.Collider]
    dirH: 200
    dirV: -200
    onCollision: (data) ->
      console.log data
      if data.side[0] is "bottom"
        @dirV *= -1 if @dirV < 0
      if data.side[0] is "top"
        @dirV *= -1 if @dirV > 0
      if data.side[0] is "left"
        @dirH *= -1 if @dirH > 0
      if data.side[0] is "right"
        @dirH *= -1 if @dirH < 0
    update: ->
      collision = @collider.move @dirH * Imagine.Time.deltaTime, @dirV * Imagine.Time.deltaTime
      # @dirH *= -1  if collision.side.length > 0  if collision
      pos = @element.getPosition()
      top = parseInt pos.top #todo parseint no longer needed???
      left = parseInt pos.left

      if top < 0 and @dirV < 0
        @dirV *= -1  
      if top > boxheight and @dirV > 0
        @dirV *= -1

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
      @collider.move 0, Imagine.Input.getAxis("Vertical") * -@speed * Imagine.Time.deltaTime


  class Enemy
    requireComponent: [Imagine.Collider]
    speed: 150
    update: ->
      ball = Imagine.getComponent 'ball'
      ballpos = ball.element.getPosition().top
      mepos = @element.getPosition().top + (paddleheight/2)
      if ballpos > mepos
        @collider.move 0, @speed * Imagine.Time.deltaTime
      else
        @collider.move 0, -@speed * Imagine.Time.deltaTime

  Imagine($("#ball")[0]).addComponent new Ball()
  Imagine($("#right")[0]).addComponent new Enemy()
  Imagine($("#left")[0]).addComponent new Player()
