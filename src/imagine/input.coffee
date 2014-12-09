# class to manage and track input
class Imagine.InputAbstract

  axes: {}
  mapping: {}
  keyStatus: {}
  keyChanging: {}
  keyChanged: {}

  constructor: ->
    console.log "initing"
    Imagine.addEvent document, "keypress", (e) ->
      e = e or window.event
      
      # use e.keyCode
      keyCode = (if e.keyCode then e.keyCode else e.charCode)
      Imagine.Input.keypress keyCode
      return

    Imagine.addEvent document, "keyup", (e) ->
      e = e or window.event
      keyCode = (if e.keyCode then e.keyCode else e.charCode)
      
      #console.log("up"+keyCode);
      Imagine.Input.keyup keyCode
      return

    Imagine.addEvent document, "keydown", (e) ->
      e = e or window.event
      keyCode = (if e.keyCode then e.keyCode else e.charCode)
      
      #console.log("down"+keyCode);
      Imagine.Input.keydown keyCode
      return

    # console.log @init
    @init()

  # unused
  # @deprecated
  keypress: (keyCode) ->

  # called when a key is released
  # @param [int] keyCode keycode of the key released
  keyup: (keyCode) ->
    Imagine.notify 'onKeyUp', keyCode
    keyCode = @map(keyCode)
    @keyStatus[keyCode] = false
    @keyChanging[keyCode] = "up"
    i = 0

    while i < Imagine.objects.length
      obj = Imagine.objects[i]
      if obj._components
        for com in obj._components
          com.keyup keyCode  if com.keyup
      i++
    return

  # called when a key is released
  # @param [int] keyCode keycode of the key pressed
  keydown: (keyCode) ->
    Imagine.notify 'onKeyDown', keyCode
    keyCode = @map(keyCode)
    firstdown = false
    if @keyStatus.hasOwnProperty(keyCode)
      if @keyStatus[keyCode] isnt true
        firstdown = true
        @keyChanging[keyCode] = "down"
    else
      firstdown = true
      @keyChanging[keyCode] = "down"

    if firstdown
    
      i = 0
      while i < Imagine.objects.length
        obj = Imagine.objects[i]
        if obj._components
          for com in obj._components
            com.keydown keyCode  if com.keydown
        i++

    @keyStatus[keyCode] = true
    return

  defaults:
    axes:
      Horizontal:
        positive: "right"
        negative: "left"

      Vertical:
        positive: "up"
        negative: "down"

    mapping:
      left: 37
      up: 38
      right: 39
      down: 40
      shift: 16
      enter: 13
      ctrl: 17
      escape: 27
      

  # old init function from before this was a class
  # @param [Object] params the config object used to init
  init: (params) ->
    @config = JSON.parse(JSON.stringify(@defaults)) #extend params
    @axes = @config.axes
    @mapping = @config.mapping
    return

  # reset function wipes all stored key status
  reset: ->
    @keyStatus = {}
    @keyChanging = {}
    @keyChanged = {}
    return

  # maps strings to keycode for convenience and readability
  # @param [Object] key object that maps to a keycode
  # @option options [Number] keyCode if a number is passed in, it is returned
  map: (key) ->
    return key  if typeof key is "number"
    return @mapping[key]  if @mapping.hasOwnProperty(key)
    parseInt key

  # returns true if the given key is currently down
  # @param [Object] keyCode the key being checked
  isDown: (keyCode) ->
    keyCode = @map(keyCode)
    return @keyStatus[keyCode]  if @keyStatus.hasOwnProperty(keyCode)
    false

  getKey: (keyCode) ->
    @isDown keyCode

  # returns true if the given key is currently down
  # @param [Object] keyCode the key being checked
  getKeyDown: (keyCode) ->
    keyCode = @map(keyCode)
    return true  if @keyChanged[keyCode] is "down"  if @keyChanged.hasOwnProperty(keyCode)
    false


  # returns true if the given key is currently up
  # @param [Object] keyCode the key being checked
  getKeyUp: (keyCode) ->
    keyCode = @map(keyCode)
    return true  if @keyChanged[keyCode] is "up"  if @keyChanged.hasOwnProperty(keyCode)
    false


  # returns a number between 1 and -1 describing input of an axis
  # @param [string] axis the axis being checked
  getAxis: (axis) ->
    pos = @isDown(@axes[axis].positive)
    neg = @isDown(@axes[axis].negative)
    ((if pos then 1 else 0)) + ((if neg then -1 else 0))

  # update function called per frame
  update: ->
    @keyChanged = @keyChanging
    @keyChanging = {}
    return

  # adds an axis to the list of axes to be checked
  # @param [String] axisName the name of the new axis
  # @param [Object] axis object with the data for the new axis
  addAxis: (axisName, axis) ->
    @axes[axisName] = axis
    return


Imagine.Input = new Imagine.InputAbstract()