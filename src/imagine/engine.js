var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Imagine.Engine = (function() {
  Engine.prototype.fps = 0;

  Engine.prototype.frameGap = 1000 / Engine.fps;

  Engine.prototype.inited = false;

  Engine.prototype.updateId = void 0;

  function Engine() {
    setTimeout(this.init, 0);
  }

  Engine.prototype.init = function() {
    var d;
    if (!this.inited) {
      this.inited = true;
      d = new Date();
      Imagine.time.startTime = d.getTime();
      Imagine.time.lastTime = Imagine.time.startTime;
      Imagine.engine.setFPS(this.fps);
    }
  };

  Engine.prototype.update = function() {
    var com, i, key, obj;
    Imagine.time.update();
    Imagine.input.update();
    i = 0;
    while (i < Imagine.objects.length) {
      obj = Imagine.objects[i];
      if (obj._components) {
        for (key in obj._components) {
          if (obj._components.hasOwnProperty(key)) {
            com = obj._components[key];
            if (com.update) {
              com.update();
            }
          }
        }
      }
      i++;
    }
    if (this.fps === 0) {
      this.updateId = requestAnimationFrame(this.update);
    }
  };

  Engine.prototype.forceUpdate = function() {
    return this.update();
  };

  Engine.prototype.clearUpdate = function() {
    clearInterval(this.updateId);
    cancelAnimationFrame(this.updateId);
  };

  Engine.prototype.setFPS = function(newFPS) {
    this.fps = newFPS;
    Imagine.engine.clearUpdate();
    if (this.fps === 0) {
      this.frameGap = 0;
      this.updateId = requestAnimationFrame(this.update);
    } else {
      this.frameGap = 1000 / this.fps;
      this.updateId = setInterval(this.update, this.frameGap);
    }
  };

  Engine.prototype.addComponent = function(com) {
    var c1, c2, j, k, len, len1, obj, ref, ref1;
    if (!com) {
      console.log("component not defined");
      return this;
    }
    obj = this._object || this;
    com._object = obj;
    if (!obj._components) {
      obj._components = [];
    }
    obj._components.push(com);
    Imagine.engine.assignfunctions(com);
    ref = obj._components;
    for (j = 0, len = ref.length; j < len; j++) {
      c1 = ref[j];
      if (c1._register) {
        ref1 = obj._components;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          c2 = ref1[k];
          if (!c2[c1._register]) {
            c2[c1._register] = c1;
          }
        }
      }
    }
    if (com.start) {
      com.start();
    }
    return com;
  };

  Engine.prototype.getComponent = function(name) {
    var com, j, len, obj, ref;
    obj = this._object || this;
    if (obj._components) {
      ref = obj._components;
      for (j = 0, len = ref.length; j < len; j++) {
        com = ref[j];
        if (com.name === name) {
          return com;
        }
      }
    }
  };

  Engine.prototype.getTag = function(name) {
    var com, j, k, len, len1, obj, ref, ref1, tag;
    obj = this._object || this;
    if (obj._components) {
      ref = obj._components;
      for (j = 0, len = ref.length; j < len; j++) {
        com = ref[j];
        if (com.tags) {
          ref1 = com.tags;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            tag = ref1[k];
            if (tag === name) {
              return com;
            }
          }
        }
      }
    }
  };

  Engine.prototype.addTag = function(name) {
    if (!this.tags) {
      this.tags = [];
    }
    this.tags.push(name);
    return this;
  };

  Engine.prototype.hasTag = function(name) {
    return indexOf.call(this.tags, name) >= 0;
  };

  Engine.prototype.removeTag = function(name) {};

  Engine.prototype.notify = function(event, arg) {
    var com, j, len, obj, ref, results;
    obj = this._object || this;
    if (obj._components) {
      ref = obj._components;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        com = ref[j];
        if (com[event]) {
          if (typeof com[event] === "function") {
            results.push(com[event].apply(com, [arg]));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  Engine.prototype.assignfunctions = function(obj) {
    var com, j, len, ref, results;
    obj.addComponent = this.addComponent;
    obj.getComponent = this.getComponent;
    obj.getTag = this.getTag;
    obj.addTag = this.addTag;
    obj.hasTag = this.hasTag;
    obj.removeTag = this.removeTag;
    obj.notify = this.notify;
    if (obj.requireComponent) {
      if (Imagine.utils.typeIsArray(obj.requireComponent)) {
        ref = obj.requireComponent;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          com = ref[j];
          results.push(obj.addComponent(new com()));
        }
        return results;
      } else {
        return obj.addComponent(new obj.requireComponent());
      }
    }
  };

  Engine.prototype.reset = function() {
    Imagine.objects = [];
    Imagine.input.reset();
    Imagine.time.paused = false;
    this.inited = false;
    this.clearUpdate();
    this.init();
  };

  Engine.prototype.registerObject = function(obj) {
    var c, key;
    obj._components = [obj];
    Imagine.objects.push(obj);
    Imagine.engine.assignfunctions(obj);
    if (obj.start) {
      obj.start();
    }
    if (obj.component) {
      for (key in obj.component) {
        if (obj.component.hasOwnProperty(key)) {
          c = obj.component[key];
          obj.addComponent(c);
        }
      }
    }
    return obj;
  };

  Engine.prototype.getFPS = function() {
    return this.fps;
  };

  return Engine;

})();

Imagine.engine = new Imagine.Engine();

if (typeof module !== "undefined" && module !== null) {
  module.exports = Imagine.Engine;
}

// ---
// generated by coffee-script 1.9.2
