class Person
  target: [0,0]
  start: ->
    @newTarget()
  newTarget: ->
    @target = [Math.random() * 300, Math.random() * 300]
  update: ->
    pos = @element.getPosition()
    dx = pos.left - @target[0]
    dy = pos.top - @target[1]
    dir = [
      if dx < 0 then 1 else -1
      if dy < 0 then 1 else -1
      ]
    if Math.abs(pos.left - @target[0]) < 1
      dir[0] = 0
    if Math.abs(pos.top - @target[1]) < 1
      dir[1] = 0
    if dir[0] is 0 and dir[1] is 0
      @newTarget()
    @element.move dir[0], dir[1]

$ document
  .ready ->
    addPerson()
    Imagine $('#fps')[0]
      .addComponent new Imagine.FPS()

window.addPerson = (num) ->
  unless num
    num = 1
  for [1..num]
    html = $ "<div class='person' />"
    $ '#container'
      .append html
    Imagine html[0]
      .addComponent new Person()
      .element
      .move Math.random() * 300, Math.random() * 300