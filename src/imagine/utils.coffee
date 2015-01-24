# unless Imagine
#   Imagine = {}
# bunch of convenience functions
class Imagine.Utils
  # returns true if object is array
  # @param [Object] object object to test
  # @return [Boolean] if object is array
  typeIsArray: Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'
  #Returns true if it is a DOM node
  isNode: (o) -> (if typeof Node is "object" then o instanceof Node else o and typeof o is "object" and typeof o.nodeType is "number" and typeof o.nodeName is "string")

  #Returns true if it is a DOM element
  isElement: (o) -> (if typeof HTMLElement is "object" then o instanceof HTMLElement else o and typeof o is "object" and o isnt null and o.nodeType is 1 and typeof o.nodeName is "string")

Imagine.utils = new Imagine.Utils()
module?.exports = Imagine.Utils