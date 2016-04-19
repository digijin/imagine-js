// unless Imagine
//   Imagine = {}
// bunch of convenience functions
class Utils {
  // returns true if object is array
  // @param [Object] object object to test
  // @return [Boolean] if object is array
  // typeIsArray(o){
  //   if(Array.isArray){
  //     return Array.isArray(o);
  //   }else{
  //     return {}.toString.call( o ) === '[object Array]';}
  //   }
  // }
  //Returns true if it is a DOM node
  static isNode(o) { (typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"); }

  //Returns true if it is a DOM element
  static isElement(o) { (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"); }
};

module.exports = Utils;
