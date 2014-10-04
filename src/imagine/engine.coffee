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
      # obj.update()  if obj.update

      if obj._components
        for key of obj._components
          if obj._components.hasOwnProperty(key)
            com = obj._components[key]
            com.update()  if com.update

      i++
    
    if fps is 0
      updateId = requestAnimationFrame update
    return

  clearUpdate = ->
    clearInterval updateId
    cancelAnimationFrame updateId
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

  addComponent = (com)->
    unless com
      console.log "component not defined"
      return this

    obj = this._object or this

    console.log com
    com._object = obj
    obj._components = [] unless obj._components
    obj._components.push(com)
    assignfunctions(com)

    # console.log com._register
    for c1 in obj._components
      if c1._register
        for c2 in obj._components
          unless c2[c1._register]
            c2[c1._register] = c1 #ease of use
          

    com.start()  if com.start
    com

  getComponent = (name) ->
    obj = this._object or this
    if obj._components
      for com in obj._components
        if com.name is name
          return com

  getTag = (name) ->
    obj = this._object or this
    if obj._components
      for com in obj._components
        if com.tags
          for tag in com.tags
            if tag is name
              return com

  addTag = (name) ->
    this.tags = [] unless this.tags
    this.tags.push name
    return this
  
  hasTag = (name) ->
    name in @tags

  removeTag = (name) ->
    
  notify = (event, arg) ->
    obj = this._object or this
    # console.log "notifying", obj
    # console.log obj
    if obj._components
      for com in obj._components
        # console.log com.name, com, event, com[event]
        if com[event]
          if typeof com[event] is "function"
            com[event].apply(com, [arg])
  
  assignfunctions = (obj) ->
    obj.addComponent = addComponent
    obj.getComponent = getComponent
    obj.getTag = getTag
    obj.addTag = addTag
    obj.hasTag = hasTag
    obj.removeTag = removeTag
    obj.notify = notify

  setTimeout init, 0 #run init next frame
  #exposing functions for testing
  clearUpdate: clearUpdate
  reset: ->
    Imagine.objects = []
    Imagine.Input.reset()
    inited = false
    clearUpdate()
    init()
    return

  registerObject: (obj) ->
    # newobj = {_components: [obj]}
    assignfunctions(obj)

    # Imagine.objects.push {_components:[obj]}
    obj._components = [obj] #temp hack
    Imagine.objects.push obj
    obj.start()  if obj.start
    if obj.component
      for key of obj.component
        if obj.component.hasOwnProperty(key)
          c = obj.component[key]
          obj.addComponent(c)
    
    obj
  update: update # testing
  forceUpdate: update
  getFPS: ->
    fps

  setFPS: setFPS
)()