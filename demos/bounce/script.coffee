$(document).ready ->
  Time = Imagine.time
  Input = Imagine.Input
  Imagine.engine.setFPS 0
  Imagine
    element: $("#ball")
    start: ->
      @element.css "left", @element.parent().width() * Math.random()
      @element.css "top", @element.parent().height() * Math.random()
      return

    dirH: 1
    dirV: 1
    update: ->
      speed = 200
      dt = Time.deltaTime
      left = parseFloat(@element.css("left"))
      top = parseFloat(@element.css("top"))
      if left + @element.width() >= @element.parent().width() - 5
        @dirH = -@dirH  if @dirH > 0
      else @dirH = -@dirH  if @dirH < 0  if left <= 0
      #HIT SIDE WALLS
      if top + @element.height() >= @element.parent().height() - 5
        @dirV = -@dirV  if @dirV > 0
      else @dirV = -@dirV  if @dirV < 0  if top <= 0
      #HIT TOP OR BOTTOM
      @dirV += dt * 0.4 #gravity
      
      #a little interaction
      if Input.getKeyDown("left")
        @dirH -= 0.3
      else @dirH += 0.3  if Input.getKeyDown("right")
      
      #a little interaction
      if Input.getKeyDown("up")
        @dirV -= 0.3
      else @dirV += 0.3  if Input.getKeyDown("down")
      @element.css "left", left + (dt * @dirH * speed)
      @element.css "top", top + (dt * @dirV * speed)
      return

  
  #this.element.css('top', top+Time.deltaTime);
  Imagine
    element: $("#output")
    start: ->
      @element.prepend "use arrow keys to change direction<br />"
      return

    keyup: (keyCode) ->
      
      #console.log(keyCode);
      @element.prepend "" + keyCode + " released <br />"
      return

    keydown: (keyCode) ->
      
      #console.log(keyCode);
      @element.prepend "" + keyCode + " pressed <br />"
      return

  return
