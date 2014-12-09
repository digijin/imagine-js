class Imagine.Utils
  typeIsArray: Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'

Imagine.utils = new Imagine.Utils()
