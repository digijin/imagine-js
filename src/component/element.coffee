

# handles interaction with html elements
class Imagine.Element
  name: "element"
  tags: ['element']
  _register: 'element'
  # constructor
  constructor: (@raw) ->
    unless Imagine.utils.isElement @raw
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

  # initialises the position
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

module?.exports = Imagine.Element