
Imagine = (params) ->
  Imagine.process params

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

Imagine.objects = []
Imagine.addEvent = (element, eventName, callback) ->
  if element.addEventListener
    element.addEventListener eventName, callback, false
  else if element.attachEvent
    element.attachEvent "on" + eventName, callback
  else
    element["on" + eventName] = callback
  return

Imagine.getComponent = (name) ->
  for obj in Imagine.objects
    com = obj.getComponent name
    return com if com

Imagine.getComponents = (name) ->
  out = []
  for obj in Imagine.objects
    com = obj.getComponent name
    out.push(com) if com
  out

Imagine.notify = (func) ->
  for obj in Imagine.objects
    obj.notify func

Imagine.destroy = (obj) ->

  obj = obj._object or obj

  if obj in Imagine.objects
    ind = Imagine.objects.indexOf obj
    # console.log ind
    Imagine.objects.splice ind, 1




I = i= Imagine