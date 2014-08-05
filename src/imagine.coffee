Imagine = (params) ->
  if Object::toString.call(params) is "[object Array]"
    i = 0

    while i < params.length
      Imagine params[i]
      i++
  else
    out = Imagine.engine.registerObject params
    out.start()  if out.start
    if out.component
      for key of out.component
        if out.component.hasOwnProperty(key)
          obj = out.component[key]
          # out.addComponent(obj)
          obj.start()  if obj.start
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



I = i= Imagine