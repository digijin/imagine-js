Imagine.engine = 

makeEngine = ->
  fps = 12
  frameGap = 1000 / fps
  inited = false
  init = ->
    unless inited
      inited = true
      d = new Date()
      Imagine.Time.startTime = d.getTime()
      Imagine.Time.lastTime = Imagine.Time.startTime
      updateId = setInterval(update, frameGap)
    return

  updateId = undefined
  update = ->
    
    #update Time;
    Imagine.Time.update()
    Imagine.Input.update()
    i = 0

    while i < Imagine.objects.length
      obj = Imagine.objects[i]
      
      #todo: set script execution order
      obj.update()  if obj.update
      i++
    requestAnimationFrame update  if fps is 0
    return

  clearUpdate = ->
    clearInterval updateId
    return

  setTimeout init, 0 #run init next frame
  reset: ->
    Imagine.objects = []
    Imagine.Input.reset()
    inited = false
    clearUpdate()
    init()
    return

  registerObject: (obj) ->
    
    #console.log("registering");
    obj.AddComponent = ->

    if obj.component
      for key of obj.component
        if obj.component.hasOwnProperty(key)
          c = obj.component[key]
          c.AddComponent = ->

          c.GetComponent = ->
    Imagine.objects.push obj
    return

  forceUpdate: update
  getFPS: ->
    fps

  setFPS: (newFPS) ->
    fps = newFPS
    clearUpdate()
    if fps is 0
      frameGap = 0
      updateId = requestAnimationFrame(update)
    else
      frameGap = 1000 / fps
      updateId = setInterval(update, frameGap)
    return

Imagine.engine = makeEngine()