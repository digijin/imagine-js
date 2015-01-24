# unless Imagine
#   Imagine = {}

# a class for managing time and time deltas
# automatically instatniated by the imagine engine
class Imagine.TimeAbstract

  # if game is paused
  paused: false

  # the time since the last frame
  deltaTime: 0

  # current time passed since start
  currentTime: 0

  # time of last frame
  lastTime: 0

  # time simulation started
  startTime: 0

  # pauses the engine
  pause: (toPause) ->
    if toPause or not toPause #yolo
      @paused = ! @paused

    if @paused
      Imagine.engine.clearUpdate()
    else
      Imagine.engine.setFPS Imagine.engine.getFPS()



  # called each frame, updates frame time info
  update: ->
    d = new Date()
    dt = d.getTime()
    Imagine.time.currentTime = dt - Imagine.time.startTime
    Imagine.time.deltaTime = (dt - Imagine.time.lastTime) / 1000
    Imagine.time.lastTime = dt

Imagine.time = new Imagine.TimeAbstract()
# Imagine.time = Imagine.Time
module?.exports = Imagine.TimeAbstract