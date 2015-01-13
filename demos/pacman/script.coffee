map = [
  '111111111'
  '100010001'
  '101000101'
  '100010001'
  '111111111'
]
blockSize = 32

class Character
  name: 'character'
  start: ->
    @current = {x:1, y:1}
    @offset = {x:0, y:0}
    @dir = {x:1, y:0}
    @setPosition()
    # console.log @element.getPosition()
  setPosition: ->
    @element.setPosition blockSize*(@current.x + @offset.x)
      ,blockSize*(@current.y+@offset.y)
  isBlock = (x, y) ->
    map[y][x] is "1"
  newNode: ()->
    # console.log "!"
    @current = 
      x: Math.round @current.x + @offset.x
      y: Math.round @current.y + @offset.y

    @offset = {x: 0, y:0}
    @checkNewDirection()
  checkNewDirection: ->
    if Imagine.Input.isDown 'left'
      @dir = {x: -1, y:0}
    if Imagine.Input.isDown 'right'
      @dir = {x: 1, y:0}
    if Imagine.Input.isDown 'up'
      @dir = {x: 0, y:-1}
    if Imagine.Input.isDown 'down'
      @dir = {x: 0, y:1}

  update: ->
    @offset.x += @dir.x * Imagine.time.deltaTime
    @offset.y += @dir.y * Imagine.time.deltaTime
    if Math.abs(@offset.x) > 1 or Math.abs(@offset.y) > 1
      @newNode()

    # look for turn around anytime
    if @dir.x is 1
      if Imagine.Input.isDown 'left'
        @dir = {x: -1, y:0}
    else if @dir.x is -1
      if Imagine.Input.isDown 'right'
        @dir = {x: 1, y:0}

    if @dir.y is 1
      if Imagine.Input.isDown 'up'
        console.log "?"
        @dir = {x: 0, y:-1}
    else if @dir.y is -1
      if Imagine.Input.isDown 'down'
        @dir = {x: 0, y:1}



    if @offset.x < 0
      if isBlock @current.x-1, @current.y
        @offset.x = 0
        @checkNewDirection()
    else if @offset.x > 0
      if isBlock @current.x+1, @current.y
        @offset.x = 0
        @checkNewDirection()

    if @offset.y < 0
      if isBlock @current.y, @current.y-1
        @offset.y = 0
        @checkNewDirection()
    else if @offset.y > 0
      if isBlock @current.y, @current.y+1
        @offset.y = 0
        @checkNewDirection()


    @setPosition()



class Game
  constructor: ->
    @container = document.getElementById 'container'
    drawBG()
    addCharacter()


  addCharacter = ->
    el = document.createElement 'div'
    el.className = 'pacman'
    @container.appendChild el
    Imagine el
      .addComponent new Character()
      
    


  drawBG = ->
    # console.log container
    @container.style.width = (map[0].length * blockSize) + "px"
    @container.style.height = (map.length * blockSize) + "px"
    # debugger
    bg = document.createElement 'div'
    bg.className = "bg"
    @container.appendChild bg
    for row in map
      for cell in row
        # console.log cell, cell is 1
        div = document.createElement 'div'
        bg.appendChild div
        name = "open"
        if cell is "1"
          name = "block"
        div.className = name












window.onload = ->
  # console.log init
  # init()
  new Game()

