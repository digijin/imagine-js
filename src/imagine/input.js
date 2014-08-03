Imagine.Input = (function(){
  var axes, defaults, getAxis, getKeyDown, getKeyUp, init, isDown, keyChanged, keyChanging, keyStatus, keydown, keypress, keyup, map, mapping, reset, update;
  Imagine.addEvent(document, "keypress", function (e) {
    var keyCode
    e = e || window.event;
    keyCode =  e.keyCode ? e.keyCode : e.charCode;
    keypress(keyCode);
  });

  Imagine.addEvent(document, "keyup", function (e) {
    var keyCode
    e = e || window.event;
    keyCode =  e.keyCode ? e.keyCode : e.charCode;
    keyup(keyCode);
  });

  Imagine.addEvent(document, "keydown", function (e) {
    var keyCode
    e = e || window.event;
    keyCode =  e.keyCode ? e.keyCode : e.charCode;
    keydown(keyCode);
  });

  keypress = function(keyCode){
    //console.log(keyCode);
  };
  keypress = function(keyCode) {};
  keyStatus = {};
  keyChanging = {};
  keyChanged = {};
  keyup = function(keyCode) {
    var i, obj;
    keyCode = map(keyCode);
    keyStatus[keyCode] = false;
    keyChanging[keyCode] = "up";
    i = 0;
    while (i < Imagine.objects.length) {
      obj = Imagine.objects[i];
      if (obj.keyup) {
        obj.keyup(keyCode);
      }
      i++;
    }
  };
  keydown = function(keyCode) {
    var i, obj;
    keyCode = map(keyCode);
    if (keyStatus.hasOwnProperty(keyCode)) {
      if (keyStatus[keyCode] !== true) {
        keyChanging[keyCode] = "down";
      }
    } else {
      keyChanging[keyCode] = "down";
    }
    keyStatus[keyCode] = true;
    i = 0;
    while (i < Imagine.objects.length) {
      obj = Imagine.objects[i];
      if (obj.keydown) {
        obj.keydown(keyCode);
      }
      i++;
    }
  };
  defaults = {
    axes: {
      Horizontal: {
        positive: "right",
        negative: "left"
      },
      Vertical: {
        positive: "up",
        negative: "down"
      }
    },
    mapping: {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    }
  };
  init = function(params) {
    var config = JSON.parse(JSON.stringify(defaults));  //extend params
    axes = config.axes;
    mapping = config.mapping;
  };

  reset = function() {
    keyStatus = {};
    keyChanging = {};
    keyChanged = {};
  };
  map = function(key) {
    if(typeof key === "number") {
      return key;
    }
    if(mapping.hasOwnProperty(key)) {
      return mapping[key];
    }
    return parseInt(key);
  };

  isDown = function(keyCode) {
    keyCode = map(keyCode);
    if(keyStatus.hasOwnProperty(keyCode)){
      return keyStatus[keyCode];
    }
    return false;
  };

  getKeyDown = function(keyCode) {
    keyCode = map(keyCode);
    if(keyChanged.hasOwnProperty(keyCode)){
      if(keyChanged[keyCode] == "down"){
        return true;
      }
    }
    return false;
  };

  getKeyUp = function(keyCode) {
    keyCode = map(keyCode);
    if(keyChanged.hasOwnProperty(keyCode)){
      if(keyChanged[keyCode] == "up"){
        return true;
      }
    }
    return false;
  };

  getAxis = function(axis) {
    var pos = isDown(axes[axis].positive);
    var neg = isDown(axes[axis].negative);
    return (pos?1:0) + (neg?-1:0);
  };

  update = function() {
    keyChanged = keyChanging;
    keyChanging = {};
  };

  // var getAxes = function(){
  //   return axes
  // }
  init();
  return {
    axes: axes,
    addAxis: function(axisName, axis){
      axes[axisName] = axis;
    },
    keypress: keypress,
    keyup: keyup,
    keydown: keydown,
    map: map,
    isDown: isDown,
    getKey: isDown,
    reset: reset,
    update: update,
    getKeyDown: getKeyDown,
    getKeyUp: getKeyUp,
    getAxis: getAxis
  };
})();
