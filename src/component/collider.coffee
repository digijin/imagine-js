# requires jq

Imagine.collider = ->
  name: 'collider'
  tags: ['collider']
  start: ->
    @element = @getComponent("element")
    return

  move: (x, y)->
    @element.style.top = x+"px"
    @element.style.left = y+"px"

  collidesWith: (obj) ->
    myrect = @element.getBoundingClientRect()
    obrect = obj.getBoundingClientRect()

    @compareSquares
      t:myrect.top
      r:myrect.right
      b:myrect.bottom
      l:myrect.left
    ,
      t:obrect.top
      r:obrect.right
      b:obrect.bottom
      l:obrect.left

  compareSquares: (sq1, sq2) ->

    outsideH = sq1.b < sq2.t or sq2.b < sq1.t
    outsideV = sq1.r < sq2.l or sq2.r < sq1.l
    not outsideV and not outsideH
