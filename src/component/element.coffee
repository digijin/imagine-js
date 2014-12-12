# handles interaction with html elements
class Imagine.Element
  name: "element"
  tags: ['element']
  _register: 'element'
  constructor: (@raw) ->
    unless isElement @raw
      throw new Error "Not a HTML object"
    @raw.getLocalRect = @getLocalRect
    @raw.move = @move
    @raw.moveTo = @moveTo

  # gets the bounding rectangle for the element
  # @return [rect] the bounding rectangle
  getLocalRect: ->
    rect = @raw.getBoundingClientRect()
    parent = @raw.parentNode
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

  posInit: ->
    @_pos =
      left: @raw.offsetLeft
      top: @raw.offsetTop
  # gets the position 
  # @return [Object] an object with a top and left attribute
  getPosition: () ->
    unless @_pos
      @posInit()
    @_pos
  
  # sets the position
  # @param [Number] X the horizontal value
  # @param [Number] Y the vertical value
  setPosition: (x, y) ->
    @_pos =
      'left': x
      'top' : y
    # console.log "setting", x, y
    @raw.style.top = y+"px"
    @raw.style.left = x+"px"
    @

  # moves to given position
  # @param [Number] X the horizontal value
  # @param [Number] Y the vertical value
  # @depreciated
  moveTo: (x, y) ->
    @setPosition x, y

  # move element by a given amount
  # @param [Number] X amount to move horizontally
  # @param [Number] Y amount to move vertically
  move: (x, y) ->
    pos = @getPosition()
    @setPosition pos.left + x, pos.top + y



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