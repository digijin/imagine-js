Imagine.Input = ->
  Imagine.addEvent document, "keypress", (e) ->
    e = e or window.event
    
    # use e.keyCode
    keyCode = (if e.keyCode then e.keyCode else e.charCode)
    keypress keyCode
    return

  Imagine.addEvent document, "keyup", (e) ->
    e = e or window.event
    keyCode = (if e.keyCode then e.keyCode else e.charCode)
    
    #console.log("up"+keyCode);
    keyup keyCode
    return

  Imagine.addEvent document, "keydown", (e) ->
    e = e or window.event
    keyCode = (if e.keyCode then e.keyCode else e.charCode)
    
    #console.log("down"+keyCode);
    keydown keyCode
    return

  keypress = (keyCode) ->

  
  #console.log(keyCode);
  keyStatus = {}
  keyChanging = {}
  keyChanged = {}
  keyup = (keyCode) ->
    keyCode = map(keyCode)
    keyStatus[keyCode] = false
    keyChanging[keyCode] = "up"
    i = 0

    while i < Imagine.objects.length
      obj = Imagine.objects[i]
      obj.keyup keyCode  if obj.keyup
      i++
    return

  keydown = (keyCode) ->
    keyCode = map(keyCode)
    if keyStatus.hasOwnProperty(keyCode)
      keyChanging[keyCode] = "down"  if keyStatus[keyCode] isnt true
    else
      keyChanging[keyCode] = "down"
    keyStatus[keyCode] = true
    i = 0

    while i < Imagine.objects.length
      obj = Imagine.objects[i]
      obj.keydown keyCode  if obj.keydown
      i++
    return

  defaults =
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

  axes = undefined
  init = (params) ->
    config = JSON.parse(JSON.stringify(defaults)) #extend params
    axes = config.axes
    mapping = config.mapping
    return

  reset = ->
    keyStatus = {}
    keyChanging = {}
    keyChanged = {}
    return

  mapping = undefined
  map = (key) ->
    return key  if typeof key is "number"
    return mapping[key]  if mapping.hasOwnProperty(key)
    parseInt key

  isDown = (keyCode) ->
    keyCode = map(keyCode)
    return keyStatus[keyCode]  if keyStatus.hasOwnProperty(keyCode)
    false

  getKeyDown = (keyCode) ->
    keyCode = map(keyCode)
    return true  if keyChanged[keyCode] is "down"  if keyChanged.hasOwnProperty(keyCode)
    false

  getKeyUp = (keyCode) ->
    keyCode = map(keyCode)
    return true  if keyChanged[keyCode] is "up"  if keyChanged.hasOwnProperty(keyCode)
    false

  getAxis = (axis) ->
    pos = isDown(axes[axis].positive)
    neg = isDown(axes[axis].negative)
    ((if pos then 1 else 0)) + ((if neg then -1 else 0))

  update = ->
    keyChanged = keyChanging
    keyChanging = {}
    return

  
  # var getAxes = function(){
  # 	return axes
  # }
  init()
  axes: axes
  addAxis: (axisName, axis) ->
    axes[axisName] = axis
    return

  keypress: keypress
  keyup: keyup
  keydown: keydown
  map: map
  isDown: isDown
  getKey: isDown
  reset: reset
  update: update
  getKeyDown: getKeyDown
  getKeyUp: getKeyUp
  getAxis: getAxis
