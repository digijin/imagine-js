# requires jq

Imagine.collider = ->


  ignoreSides: []

  name: 'collider'

  tags: ['collider']

  _register: 'collider'

  isTrigger: false

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
    # console.log colls

    collisions = []
    
    for coll in colls
      
      # do (coll) ->
      # console.log check
      if !(this is coll)

        el = coll.getComponent 'element'
        if el
          obj = el.getBoundingClientRect()
          # console.log obj
          if @compareSquares check, obj
            
            collision =
              side: []
              collider: coll

            height = pos.height or pos.bottom - pos.top
            width = pos.width or pos.right - pos.left

            # newx = x
            # newy = y

            # check top
            # console.log coll, coll.ignoreSides.indexOf("top"), "top" in coll.ignoreSides
            if pos.bottom <= obj.top and check.bottom > obj.top \
            # and coll.ignoreSides.indexOf("top") is -1
            and not ("top" in coll.ignoreSides)
              # @element.style.top = (obj.top - height)+"px"
              unless @isTrigger or coll.isTrigger
                y = (obj.top - height) - check.top
              # console.log "yt", y
              collision.side.push 'top'
            else if obj.bottom <= pos.top and check.top < obj.bottom \
            # and coll.ignoreSides.indexOf("bottom") is -1
            and not ("bottom" in coll.ignoreSides)
              # @element.style.top = (obj.bottom)+"px"
              unless @isTrigger or coll.isTrigger
                y = obj.bottom - pos.top
              # console.log "yb", y
              collision.side.push 'bottom'
            # else
            #   @element.style.top = pos.top + y+"px"
              

            if pos.right <= obj.left and check.right > obj.left \
            # and coll.ignoreSides.indexOf("left") is -1
            and not ("left" in coll.ignoreSides)
              # @element.style.left = (obj.left - width)+"px"
              unless @isTrigger or coll.isTrigger
                x = (obj.left - width) - check.left
              # console.log "xl", x
              collision.side.push 'left'
            else if obj.right <= pos.left and check.left < obj.right \
            # and coll.ignoreSides.indexOf("right") is -1
            and not ("right" in coll.ignoreSides)
              # @element.style.left = (obj.right)+"px"
              unless @isTrigger or coll.isTrigger
                x = obj.right - pos.left
              # console.log "xr", x
              collision.side.push 'right'
            # else
            #   @element.style.left = pos.left + x+"px"

            if collision.side.length > 0
              collisions.push collision

            # @element.move(x, y)
            # return collision

    # move
    # @element.style.top = (pos.top + y)+"px"
    # @element.style.left = (pos.left + x)+"px"

    @element.move(x, y)

    for coll in collisions
      # console.log coll
      # console.log @notify
      @notify 'onCollision', coll

      side = coll.side.map (obj) ->
        switch obj
          when "left"
            return "right"
          when "right"
            return "left"
          when "top"
            return "bottom"
          when "bottom"
            return "top"

      coll.collider.notify 'onCollision', {
        side
        collider: @
      }

    switch collisions.length
      when 0
        return
      when 1
        return collisions[0]
      else
        side = collisions.map (i) ->
          return i.side[0]
        # console.log side
        return {
          side: side
          collisions: collisions
        }
    return

  # moveTop: (delta) ->
  #   if @element.style.top
  #     top = parseInt @element.style.top
  #     top += delta
  #   else
  #     top =

  collidesWith: (obj) ->
    myrect = @element.getBoundingClientRect()
    obrect = obj.getBoundingClientRect()

    @compareSquares myrect, obrect

  compareSquares: (sq1, sq2) ->

    outsideH = sq1.bottom <= sq2.top or sq2.bottom <= sq1.top
    outsideV = sq1.right <= sq2.left or sq2.right <= sq1.left
    not outsideV and not outsideH
