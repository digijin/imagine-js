# a class for managing time and time deltas
# automatically instatniated by the imagine engine
class Imagine.TimeAbstract

  # the time since the last frame
  deltaTime: 0

  # current time passed since start
  currentTime: 0

  # time of last frame
  lastTime: 0

  # time simulation started
  startTime: 0

  # called each frame, updates frame time info
  update: ->
    d = new Date()
    dt = d.getTime()
    Imagine.Time.currentTime = dt - Imagine.Time.startTime
    Imagine.Time.deltaTime = (dt - Imagine.Time.lastTime) / 1000
    Imagine.Time.lastTime = dt

Imagine.Time = new Imagine.TimeAbstract()
Imagine.time = Imagine.Time