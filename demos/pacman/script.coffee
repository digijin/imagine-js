map = [
  '1111111111111111111'
  '1        1        1'
  '1 11 111 1 111 11 1'
  '1                 1'
  '1 11 1 11111 1 11 1'
  '1    1   1   1    1'
  '1111 111 1 111 1111'
  '1111 1       1 1111'
  '1111 1 11111 1 1111'
  '       11111       '
  '1111 1 11111 1 1111'
  '1111 1       1 1111'
  '1111 1 11111 1 1111'
  '1        1        1'
  '1 11 111 1 111 11 1'
  '1  1           1  1'
  '11 1 1 11111 1 1 11'
  '1    1   1   1    1'
  '1 111111 1 111111 1'
  '1                 1'
  '1111111111111111111'
]
blockSize = 16

class Character
  name: 'character'
  start: ->
    @current = {x:1, y:1}
    @offset = {x:0, y:0}
    @dir = {x:0, y:0}
    @speed = 4 #blocks per second
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
  detectPickup: ->
    pickups = Imagine.getComponents 'pickup'
    # pickup = pickups[0]
    for pickup in pickups
      # debugger
      if @collider.collidesWith pickup.element.raw
        pickup.element.raw.parentNode.removeChild(pickup.element.raw)
        Imagine.destroy pickup

  checkNewDirection: ->
    if Imagine.Input.isDown 'left'
      unless isBlock @current.x-1, @current.y 
        @dir = {x: -1, y:0}
    if Imagine.Input.isDown 'right'
      unless isBlock @current.x+1, @current.y 
        @dir = {x: 1, y:0}
    if Imagine.Input.isDown 'up'
      unless isBlock @current.x, @current.y-1
        @dir = {x: 0, y:-1}
    if Imagine.Input.isDown 'down'
      unless isBlock @current.x, @current.y+1
        @dir = {x: 0, y:1}

  detectTurnAround: ->
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
  update: ->
    if Imagine.Input.isDown 'enter'
      debugger

    

    if @dir.x is 0 and @dir.y is 0
      @checkNewDirection()

    @offset.x += @dir.x * Imagine.time.deltaTime * @speed
    @offset.y += @dir.y * Imagine.time.deltaTime * @speed
    if Math.abs(@offset.x) > 1 or Math.abs(@offset.y) > 1
      @newNode()


    @detectTurnAround()


    if @offset.x < 0
      if isBlock @current.x-1, @current.y
        @offset.x = 0
        @checkNewDirection()
    else if @offset.x > 0
      if isBlock @current.x+1, @current.y
        @offset.x = 0
        @checkNewDirection()

    if @offset.y < 0
      if isBlock @current.x, @current.y-1
        @offset.y = 0
        @checkNewDirection()
    else if @offset.y > 0
      if isBlock @current.x, @current.y+1
        @offset.y = 0
        @checkNewDirection()


    @setPosition()

class Player extends Character
  update: ->
    super
    @detectPickup()

class Enemy extends Character
  start: ->
    super
    @current = {x:10, y:1}
    @setPosition()
  checkNewDirection: ->
    dirs = [
      {x: 1, y:0}
      {x: -1, y:0}
      {x: 0, y:1}
      {x: 0, y:-1}
      ]
    # dirs.reduce (a,b) ->
    dirs = _.without dirs, @dir
    @dir = _.sample dirs
  detectTurnAround: -> #dont.


class Pickup
  name: 'pickup'

  constructor: (x,y)->
    # debugger
    @pos = {x:x, y:y}
  start: ->
    @setPosition()
  setPosition: ->
    @element.setPosition (blockSize*(@pos.x))+4
      ,(blockSize*(@pos.y))+4


class Game
  constructor: ->
    @container = document.getElementById 'container'
    drawBG()
    addCharacter()
    addEnemy()


  addCharacter = ->
    el = document.createElement 'div'
    el.className = 'pacman'
    @container.appendChild el
    Imagine el
      .addComponent new Imagine.Collider()
      .addComponent new Player()
      
  addEnemy = ->
    el = document.createElement 'div'
    el.className = 'ghost'
    @container.appendChild el
    Imagine el
      .addComponent new Enemy()
      
  addPickup = (x, y) ->
    el = document.createElement 'div'
    el.className = 'pickup'
    @container.appendChild el
    Imagine el
      .addComponent new Pickup(x, y)


  drawBG = ->
    # console.log container
    @container.style.width = (map[0].length * blockSize) + "px"
    @container.style.height = (map.length * blockSize) + "px"
    # debugger
    bg = document.createElement 'div'
    bg.className = "bg"
    @container.appendChild bg
    
    y = 0
    for row in map
      x = 0
      for cell in row
        # console.log cell, cell is 1
        div = document.createElement 'div'
        bg.appendChild div
        name = "open"
        if cell is "1"
          name = "block"
        else
          # put a point in it
          addPickup x, y
          # pickup = document.createElement 'div'
          # pickup.className = "pickup"
          # @container.appendChild pickup
          # console.log pickup
          # Imagine pickup
          #   .addComponent new Pickup(x, y)
        div.className = name
        x++
      y++












window.onload = ->
  # console.log init
  # init()
  new Game()

