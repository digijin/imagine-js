
# main class
class Imagine
  # iniotialises and object and registers it with imagine
  constructor: (params) ->
    return Imagine.process params

  # the objects to be tracked by imagine
  @objects: []

  # @testsetst: new Imagine.InputAbstract()

  # processes objects to be added
  @process: (params) ->
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


  # adds an event to imagine
  @addEvent: (element, eventName, callback) ->
    if element.addEventListener
      element.addEventListener eventName, callback, false
    else if element.attachEvent
      element.attachEvent "on" + eventName, callback
    else
      element["on" + eventName] = callback
    return

  # get component by name
  @getComponent: (name) ->
    for obj in Imagine.objects
      com = obj.getComponent name
      return com if com

  # get multiple component by name
  @getComponents: (name) ->
    out = []
    for obj in Imagine.objects
      com = obj.getComponent name
      out.push(com) if com
    out

  # notify all listening imagine objects
  # @param [String] func the name of the function to be called
  @notify: (func) ->
    for obj in Imagine.objects
      obj.notify func

  # destroy imagine object and stop callbacks and events
  @destroy: (obj) ->

    obj = obj._object or obj

    if obj in Imagine.objects
      ind = Imagine.objects.indexOf obj
      # console.log ind
      Imagine.objects.splice ind, 1


# window.Imagine = Imagine

# Imagine.component = require './imagine/component.coffee'
# Imagine.engine = require './imagine/engine.coffee'
# Imagine.input = require './imagine/input.coffee'
# Imagine.time = require './imagine/time.coffee'
# Imagine.utils = require './imagine/utils.coffee'



module?.exports = Imagine