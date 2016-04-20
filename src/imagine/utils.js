// unless Imagine
//   Imagine = {}
// bunch of convenience functions
class Utils {
  // returns true if object is array
  // @param [Object] object object to test
  // @return [Boolean] if object is array
  static isArray(o){
    if(Array.isArray){
      return Array.isArray(o);
    }else{
      return {}.toString.call(o) === '[object Array]';
    }
  }
  //Returns true if it is a DOM node
  static isNode(o) { return (typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"); }

  //Returns true if it is a DOM element
  static isElement(o) { return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"); }

  static addEvent(element, eventName, callback) {
    if(element.addEventListener){
      element.addEventListener(eventName, callback, false);
    }else if(element.attachEvent){
      element.attachEvent('on'+eventName, callback);
    }else{
      element["on"+eventName] = callback;
    }
  }
};

module.exports = Utils;
