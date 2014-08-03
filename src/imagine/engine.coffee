Imagine.engine = (->
  fps = 0
  frameGap = 1000 / fps
  inited = false
  init = ->
    unless inited
      inited = true
      d = new Date()
      Imagine.Time.startTime = d.getTime()
      Imagine.Time.lastTime = Imagine.Time.startTime
      setFPS(fps)
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

      if obj.component
        for key of obj.component
          if obj.component.hasOwnProperty(key)
            com = obj.component[key]
            com.update()  if com.update

      i++
    
    if fps is 0
    	requestAnimationFrame update
    return

  clearUpdate = ->
    clearInterval updateId
    return

  setFPS = (newFPS) ->
    fps = newFPS
    clearUpdate()
    if fps is 0
      frameGap = 0
      updateId = requestAnimationFrame(update)
    else
      frameGap = 1000 / fps
      updateId = setInterval update, frameGap
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
    obj.addComponent = ->

    if obj.component
      for key of obj.component
        if obj.component.hasOwnProperty(key)
          c = obj.component[key]
          c.addComponent = ->

          c.getComponent = ->
    Imagine.objects.push obj
    return

  forceUpdate: update
  getFPS: ->
    fps

  setFPS: setFPS
)()