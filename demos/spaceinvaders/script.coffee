$(document).ready ->
  Number::clamp = (min, max) ->
    Math.min Math.max(this, min), max

  Imagine.engine.setFPS 60
  Imagine
    el: $("#player")
    update: ->
      dt = Imagine.time.deltaTime
      speed = 100
      left = parseFloat(@el.css("left"))
      left += (dt * speed * Imagine.input.getAxis("Horizontal"))
      left = left.clamp(1, @el.parent().width() - @el.width() - 3)
      @el.css "left", left
      return

  Imagine
    el: $("#enemyGroup")
    speed: 100
    downSpeed: 10
    top: 10
    topGap: 10
    stage: "r"
    start: ->
      @el.css "top", @top
      return

    update: ->
      dt = Imagine.time.deltaTime
      left = parseFloat(@el.css("left"))
      top = parseFloat(@el.css("top"))
      switch @stage
        when "r"
          left += (dt * @speed)
          max = @el.parent().width() - @el.width()
          if left >= max
            left = max
            @stage = "d"
            @top += @topGap
          @el.css "left", left
        when "d"
          top += (dt * @downSpeed)
          if top > @top
            top = @top
            if left > 100
              @stage = "l"
            else
              @stage = "r"
          if top > 200
            @top = 0
            top = 0
          @el.css "top", top
        when "l"
          left -= (dt * @speed)
          if left < 0
            left = 0
            @stage = "d"
            @top += @topGap
          @el.css "left", left

  return
