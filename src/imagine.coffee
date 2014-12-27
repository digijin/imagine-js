
# iniotialises and object and registers it with imagine
Imagine = (params) ->
  Imagine.process params

# processes objects to be added
Imagine.process = (params) ->
  if Object::toString.call(params) is "[object Array]"
    i = 0

    while i < params.length
      Imagine.process params[i]
      i++
  else

    if isElement params
      el = new Imagine.Element params
      out = Imagine.process({}).addComponent(el)
    else
      out = Imagine.engine.registerObject params
  out

# the objects to be tracked by imagine
Imagine.objects = []

# adds an event to imagine
Imagine.addEvent = (element, eventName, callback) ->
  if element.addEventListener
    element.addEventListener eventName, callback, false
  else if element.attachEvent
    element.attachEvent "on" + eventName, callback
  else
    element["on" + eventName] = callback
  return

# get component by name
Imagine.getComponent = (name) ->
  for obj in Imagine.objects
    com = obj.getComponent name
    return com if com

# get multiple component by name
Imagine.getComponents = (name) ->
  out = []
  for obj in Imagine.objects
    com = obj.getComponent name
    out.push(com) if com
  out

# notify all listening imagine objects
Imagine.notify = (func) ->
  for obj in Imagine.objects
    obj.notify func

# destroy imagine object and stop callbacks and events
Imagine.destroy = (obj) ->

  obj = obj._object or obj

  if obj in Imagine.objects
    ind = Imagine.objects.indexOf obj
    # console.log ind
    Imagine.objects.splice ind, 1




I = i= Imagine