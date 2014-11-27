# a class for managing time and time deltas
# automatically instatniated by the imagine engine
class Imagine.TimeAbstract

  @deltaTime = 0
  @currentTime = 0
  @lastTime = 0
  @startTime = 0

  # called each frame, updates frame time info
  update: ->
    d = new Date()
    dt = d.getTime()
    Imagine.Time.currentTime = dt - Imagine.Time.startTime
    Imagine.Time.deltaTime = (dt - Imagine.Time.lastTime) / 1000
    Imagine.Time.lastTime = dt

Imagine.Time = new Imagine.TimeAbstract()