unless Imagine
  Imagine = {}
# bunch of convenience functions
class Imagine.Utils
  # returns true if object is array
  # @param [Object] object object to test
  # @return [Boolean] if object is array
  typeIsArray: Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'

Imagine.utils = new Imagine.Utils()
module?.exports = Imagine.Utils