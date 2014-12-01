player = undefined
playerScore = 0
enemyScore = 0
$(document).ready ->
  
  # Imagine.engine.setFPS(10);
  ball =
    dirH: 200
    dirV: -200
    start: ->
      @el = $(@getComponent("element"))
      @coll = @getComponent("collider")
      return

    update: ->
      collision = @coll.move(@dirH * Imagine.Time.deltaTime, @dirV * Imagine.Time.deltaTime)
      @dirH *= -1  if collision.side.length > 0  if collision
      top = parseInt(@el.css("top"))
      left = parseInt(@el.css("left"))
      @dirV *= -1  if top < 0 and @dirV < 0
      @dirV *= -1  if top > @el.parent().height() - @el.height() and @dirV > 0
      if left < 0
        enemyScore++
        $("#enemyScore").html enemyScore
        @resetball()
      if left > @el.parent().width() - @el.width()
        playerScore++
        $("#playerScore").html playerScore
        @resetball()
      return

    resetball: ->
      x = @el.parent().width() / 2
      y = @el.parent().height() / 2
      
      # this.el.css('left', );
      # this.el.css('top', );
      @el[0].moveTo x, y
      return

  player =
    speed: 300
    start: ->
      @coll = @getComponent("collider")
      return

    update: ->
      @coll.move 0, Imagine.Input.getAxis("Vertical") * -@speed * Imagine.Time.deltaTime
      return

  enemy =
    speed: 150
    start: ->
      @coll = @getComponent("collider")
      @el = $(@getComponent("element"))
      return

    update: ->
      ball = parseInt($("#ball").css("top"))
      me = parseInt(@el.css("top")) + (@el.height() / 2)
      if ball > me
        @coll.move 0, @speed * Imagine.Time.deltaTime
      else
        @coll.move 0, -@speed * Imagine.Time.deltaTime
      return

  Imagine($("#ball")[0]).addComponent(new Imagine.Collider()).addComponent ball
  Imagine($("#right")[0]).addComponent(new Imagine.Collider()).addComponent enemy
  Imagine($("#left")[0]).addComponent(new Imagine.Collider()).addComponent player
  return
