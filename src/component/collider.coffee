# requires jq

Imagine.collider = ->
  name: 'collider'
  tags: ['collider']
  start: ->
    @element = @getComponent("element")
    return

  move: (x, y)->
    pos = @element.getBoundingClientRect()

    # check
    check = {
      top: pos.top
      right: pos.right
      bottom: pos.bottom
      left: pos.left
    }
    if y<0
      check.top += y
    else
      check.bottom += y

    if x<0
      check.left += x
    else
      check.right += x

    colls = Imagine.getComponents 'collider'
    console.log 'colls'
    for coll in colls
      do (coll) ->
        console.log coll
        console.log this
        console.log coll is this

    # move
    @element.style.top = pos.y + y+"px"
    @element.style.left = pos.x + x+"px"



  collidesWith: (obj) ->
    myrect = @element.getBoundingClientRect()
    obrect = obj.getBoundingClientRect()

    @compareSquares myrect, obrect
    #   t:myrect.top
    #   r:myrect.right
    #   b:myrect.bottom
    #   l:myrect.left
    # ,
    #   t:obrect.top
    #   r:obrect.right
    #   b:obrect.bottom
    #   l:obrect.left

  compareSquares: (sq1, sq2) ->

    outsideH = sq1.bottom < sq2.top or sq2.bottom < sq1.top
    outsideV = sq1.right < sq2.left or sq2.right < sq1.left
    not outsideV and not outsideH
