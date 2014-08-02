Imagine = (params) ->
  if Object::toString.call(params) is "[object Array]"
    i = 0

    while i < params.length
      Imagine params[i]
      i++
  else
    Imagine.engine.registerObject params
    params.start()  if params.start
    if params.component
      for key of params.component
        if params.component.hasOwnProperty(key)
          obj = params.component[key]
          obj.start()  if obj.start
  return

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