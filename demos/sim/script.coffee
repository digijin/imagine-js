class Person
  update: ->
    @getComponent 'element'
      .move Math.random()-0.5, Math.random()-0.5

$ document
  .ready ->
    console.log $('.person')[0]
    Imagine $('.person')[0]
      .addComponent new Person()

window.addPerson = ->
  html = $ "<div class='person' />"
  $ '#container'
    .append html
  Imagine html[0]
    .addComponent new Person()
    .element
    .move Math.random() * 300, Math.random() * 300