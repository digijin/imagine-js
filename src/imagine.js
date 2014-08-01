var Imagine;

Imagine = function(params) {
  var i, key, obj;
  if (Object.prototype.toString.call(params) === "[object Array]") {
    i = 0;
    while (i < params.length) {
      Imagine(params[i]);
      i++;
    }
  } else {
    Imagine.engine.registerObject(params);
    if (params.start) {
      params.start();
    }
    if (params.component) {
      for (key in params.component) {
        if (params.component.hasOwnProperty(key)) {
          obj = params.component[key];
          if (obj.start) {
            obj.start();
          }
        }
      }
    }
  }
};

Imagine.objects = [];

Imagine.addEvent = function(element, eventName, callback) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, callback);
  } else {
    element["on" + eventName] = callback;
  }
};
