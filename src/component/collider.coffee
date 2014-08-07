Imagine.collider = ->
  name: 'collider'
  tags: ['collider']
  start: ->
    @element = @getComponent("element")
    return

  collidesWith: (obj) ->
    obj = $(obj)
    top = parseFloat(@element.css("top"))
    left = parseFloat(@element.css("left"))
    bottom = top + @element.height()
    right = left + @element.width()
    o_top = parseFloat(obj.css("top"))
    o_left = parseFloat(obj.css("left"))
    o_bottom = o_top + obj.height()
    o_right = o_left + obj.width()

    compareSquares
      t:top
      r:right
      b:bottom
      l:left
    ,
      t:o_top
      r:o_right
      b:o_bottom
      l:o_left
    outsideH = bottom < o_top or o_bottom < top
    outsideV = right < o_left or o_right < left
    not outsideV and not outsideH

  compareSquares: (sq1, sq2) ->

    outsideH = sq1.b < sq2.t or sq2.b < sq1.t
    outsideV = sq1.r < sq2.l or sq2.r < sq1.l
    not outsideV and not outsideH
