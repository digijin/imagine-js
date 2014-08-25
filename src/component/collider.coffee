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
    # console.log 'colls'

    for coll in colls
      # do (coll) ->
      # console.log check
      if !(this is coll)
        el = coll.getComponent 'element'
        if el
          obj = el.getBoundingClientRect()
          if @compareSquares check, obj
            
            height = pos.height or pos.bottom - pos.top
            width = pos.width or pos.right - pos.left

            # check top
            if pos.bottom < obj.top and check.bottom > obj.top#check top
              @element.style.top = (obj.top - height)+"px"
            else if obj.bottom < pos.top and check.top < obj.bottom #check bottom
              @element.style.top = (obj.bottom)+"px"
            else
              @element.style.top = pos.y + y+"px"

            if pos.right < obj.left and check.right > obj.left #check left
              @element.style.left = (obj.left - width)+"px"
            else if obj.right < pos.left and check.left < obj.right #check right
              @element.style.left = (obj.right)+"px"
            else
              @element.style.left = pos.y + y+"px"


            return
          # if @compareSquares check, obj
          

          #   wasAbove = pos.bottom < obj.top
          #   nowNotAbove = 

          #   if wasAbove 
          #     #move flush
          #     @element.style.top = (obj.top - height)+"px"
          #   return
        

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
