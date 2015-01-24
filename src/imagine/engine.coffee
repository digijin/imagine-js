unless Imagine
  Imagine = {}

# handles a lot of grunt work
class Imagine.Engine
  fps: 0
  frameGap: 1000 / @fps
  inited: false
  updateId: undefined
  # constructor
  constructor: ->
    setTimeout @init, 0 #run init next frame

  # initialise the engine
  init: ->
    unless @inited
      @inited = true
      d = new Date()
      Imagine.time.startTime = d.getTime()
      Imagine.time.lastTime = Imagine.time.startTime
      # console.log setFPS
      Imagine.engine.setFPS(@fps)
    return
  # update per frame
  update: ->
    #update Time;
    Imagine.time.update()
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
    
    if @fps is 0
      @updateId = requestAnimationFrame @update
    return
  # forces an update to happen instantly
  forceUpdate: ->
    @update()

  # clears the update callback
  clearUpdate: ->
    clearInterval @updateId
    cancelAnimationFrame @updateId
    return

  # sets the fps the engine should run at
  # @param [Number] newFPS the new fps the engine should run at
  setFPS: (newFPS) ->
    @fps = newFPS
    Imagine.engine.clearUpdate()
    if @fps is 0
      @frameGap = 0
      @updateId = requestAnimationFrame(@update)
    else
      @frameGap = 1000 / @fps
      @updateId = setInterval @update, @frameGap
    return

  # this function is copied onto components
  addComponent: (com)->
    unless com
      console.log "component not defined"
      return this

    obj = this._object or this

    # console.log com
    com._object = obj
    obj._components = [] unless obj._components
    obj._components.push(com)

    Imagine.engine.assignfunctions(com)
    
    # console.log com._register
    for c1 in obj._components
      if c1._register
        for c2 in obj._components
          unless c2[c1._register]
            c2[c1._register] = c1 #ease of use
          

    com.start()  if com.start
    com
  # this function is copied onto components
  getComponent: (name) ->
    obj = this._object or this
    if obj._components
      for com in obj._components
        if com.name is name
          return com
  # this function is copied onto components
  getTag: (name) ->
    obj = this._object or this
    if obj._components
      for com in obj._components
        if com.tags
          for tag in com.tags
            if tag is name
              return com
  # this function is copied onto components
  addTag: (name) ->
    this.tags = [] unless this.tags
    this.tags.push name
    return this
  # this function is copied onto components
  hasTag: (name) ->
    name in @tags
  # this function is copied onto components
  removeTag: (name) ->
  
  # this function is copied onto components
  notify: (event, arg) ->
    obj = this._object or this
    # console.log "notifying", obj
    # console.log obj
    if obj._components
      for com in obj._components
        # console.log com.name, com, event, com[event]
        if com[event]
          if typeof com[event] is "function"
            com[event].apply(com, [arg])
  
  # assigns functions to a component
  # @param [Object] obj the object to add components to
  assignfunctions: (obj) ->
    obj.addComponent = @addComponent
    obj.getComponent = @getComponent
    obj.getTag = @getTag
    obj.addTag = @addTag
    obj.hasTag = @hasTag
    obj.removeTag = @removeTag
    obj.notify = @notify

    # instantly require anything in requireComponent
    if obj.requireComponent

      if Imagine.utils.typeIsArray obj.requireComponent
        for com in obj.requireComponent
          obj.addComponent new com()
      else
        obj.addComponent new obj.requireComponent()
  # reset the engine
  reset: ->
    Imagine.objects = []
    Imagine.Input.reset()
    Imagine.time.paused = false
    @inited = false
    @clearUpdate()
    @init()
    return
  # register a new object with the engine
  # @param [Object] obj the new object to add
  registerObject: (obj) ->
    # newobj = {_components: [obj]}
    #######################################################################danger copypasta addcomponent
    # Imagine.objects.push {_components:[obj]}
    obj._components = [obj] #temp hack
    Imagine.objects.push obj

    Imagine.engine.assignfunctions(obj)

    obj.start()  if obj.start
    if obj.component
      for key of obj.component
        if obj.component.hasOwnProperty(key)
          c = obj.component[key]
          obj.addComponent(c)
    
    obj
  # gets the current fps
  # @return [Number] return the current FPS
  getFPS: ->
    @fps

Imagine.engine = new Imagine.Engine()

module?.exports = Imagine.Engine