player = undefined
playerScore = 0
enemyScore = 0
boxheight = 350
boxright = 600
$(document).ready ->
  
  class Ball
    requireComponent: [Imagine.Collider]
    dirH: 200
    dirV: -200
    update: ->
      @collider.move @dirH * Imagine.Time.deltaTime, @dirV * Imagine.Time.deltaTime
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

  Imagine($("#ball")[0]).addComponent new Ball()


  class Player
    requireComponent: [Imagine.Collider]
    speed: 300
    update: -> 
      @collider.move 0, Imagine.Input.getAxis("Vertical") * -@speed * Imagine.Time.deltaTime


  Imagine($("#left")[0]).addComponent new Player()

  # enemy =
  #   speed: 150
  #   start: ->
  #     @coll = @getComponent("collider")
  #     @el = $(@getComponent("element"))
  #     return

  #   update: ->
  #     ball = parseInt($("#ball").css("top"))
  #     me = parseInt(@el.css("top")) + (@el.height() / 2)
  #     if ball > me
  #       @coll.move 0, @speed * Imagine.Time.deltaTime
  #     else
  #       @coll.move 0, -@speed * Imagine.Time.deltaTime
  #     return

  # Imagine($("#ball")[0]).addComponent(new Imagine.Collider()).addComponent ball
  # Imagine($("#right")[0]).addComponent(new Imagine.Collider()).addComponent enemy
  # Imagine($("#left")[0]).addComponent(new Imagine.Collider()).addComponent player
  # return
