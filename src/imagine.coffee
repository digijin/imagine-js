Imagine = (params) ->
  if Object::toString.call(params) is "[object Array]"
    i = 0

    while i < params.length
      Imagine params[i]
      i++
  else

    if isElement params
      params.name = "element"
      params.tags = ['element']
      out = Imagine({}).addComponent(params)
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



I = i= Imagine