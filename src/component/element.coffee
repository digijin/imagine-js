# handles interaction with html elements
class Imagine.Element
  move: ->
  moveTo: ->
  getPosition: ->
  setPosition: ->

Imagine.element = (element) ->

  unless isElement element
    throw new Error "Not a HTML object"


  el = element
  el.name = "element"
  el.tags = ['element']
  el.rect = el.getBoundingClientRect

  el._register = 'element'

  # from jquery
  el.getOffsetParent = ->
    docElem = window.document.documentElement
    # console.log @, @offsetParent
    offsetParent = @offsetParent or docElem
    # offsetParent = offsetParent.offsetParent while offsetParent and (not offsetParent.nodeName is "HTML" and jQuery.css(offsetParent, "position") is "static")
    offsetParent = offsetParent.offsetParent while not isOffsetParent offsetParent
    offsetParent or docElem

  isOffsetParent = (node)->

    # console.log "is offset parent?", node
    unless node
      return false
    # console.log node.nodeName.toLowerCase()
    if node.nodeName.toLowerCase() is "html"
      return true
    if node.nodeName.toLowerCase() is "body"
      return true
    pos = window.getComputedStyle(node).getPropertyValue('position')
    if pos is ""
      return false
    if pos is "static"
      return false
    # console.log "offset parent", true
    true


  el.getLocalRect = ->
    rect = el.getBoundingClientRect()
    parent = el.parentNode
    if parent
      prect = parent.getBoundingClientRect()
      rect =
        right: rect.right - prect.left
        bottom: rect.bottom - prect.top
        top: rect.top - prect.top
        left: rect.left - prect.left
        height: rect.bottom - rect.top
        width: rect.right - rect.left
    rect

  el.moveMode = "pos"

  el.posInit = ->
    @_pos =
      left: el.offsetLeft
      top: el.offsetTop
  el.getPosition = () ->
    unless @_pos
      @posInit()
    @_pos
  
  el.setPosition = (x, y) ->
    @_pos =
      'left': x
      'top' : y

    # console.log "setting", x, y
    @style.top = y+"px"
    @style.left = x+"px"
    el

  el.moveTo = el.setPosition
  el.move = (x, y) ->

    # movemode to help me decide best way to handle movement
    switch @moveMode

      when "rect"
        rect = el.getBoundingClientRect()
        op = el.getOffsetParent()
        oprect = op.getBoundingClientRect()
        unless y is 0
          console.log "move", y
          console.log "old ", (y+rect.top-oprect.top), rect.top, oprect.top
          console.log "new ", (y+el.offsetTop), el.offsetTop
          console.log @style.top


        @style.top = (y+rect.top-oprect.top)+"px"
        @style.left = (x+rect.left-oprect.left)+"px"
    

      when "offset"
        if @style.top
          top = parseInt @style.top
          @style.top = (y+top)+"px"
        else
          @style.top = Math.floor(y+el.offsetTop)+"px" # rounding errors in el.offsetX

        if @style.left
          left = parseInt @style.left
          @style.left = (x+left)+"px"
        else
          @style.left = Math.floor(x+el.offsetLeft)+"px"



      when "last"
        unless @lastTop
          @lastTop = el.offsetTop
        unless @lastLeft
          @lastLeft = el.offsetLeft

        @lastTop += y
        @lastLeft += x

        @style.top = @lastTop
        @style.left = @lastLeft

      when "pos"
        pos = @getPosition()
        @setPosition pos.left + x, pos.top + y


  el