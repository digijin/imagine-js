map = [
  '111111111'
  '100010001'
  '101000101'
  '100010001'
  '111111111'
]
blockSize = 32


init = ->
  drawBG()


drawBG = ->
  container = document.getElementById 'container'
  # console.log container
  container.style.width = (map[0].length * blockSize) + "px"
  container.style.height = (map.length * blockSize) + "px"
  # debugger
  bg = document.createElement 'div'
  bg.className = "bg"
  container.appendChild bg
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
  init()

