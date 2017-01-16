// @flow

'use strict';

const utils = require('./imagine/utils.js');
const objectFunctions = require('./imagine/object.js');
const _ = require('lodash');
const Element = require('./component/element.js');
const Time = require('./imagine/time');
const Input = require('./imagine/input');
const Collider = require('./component/collider');

export type GameObject = {
  AddComponent: Function
}

class Imagine {
  static Input:Input;
  static Time:Time;
  static FPS:Object;
  static Element:Element;
  static Collider:Collider;

  objects:Array<Object>;
  input:Input;
  register: Function;
  time: Time;
  constructor(params:Object) {
    this.objects = [];
    this.time = new Time();
    this.input = new Input();
    this.time.addListener(this.update.bind(this));
    if(params)
      this.register(params);
  }

  update(){
    //time already updates because it calls this
    this.input.update();
    for(var obj of this.objects){
      for(var comp of obj.components){
        if(comp.update) comp.update(this.time);
      }
    }
  }
  // enable object to be tracked by Imagine
  register(params:Object):GameObject {
    var out: Object = {}
    //todo: split this out for stricter typing
    if (utils.isArray(params)) {
      let i = 0;

      while (i < params.length) {
        out = this.register(params[i]);//recurse
        i++;
      }
    } else {

      if (utils.isElement(params)) {
        let el = new Element(params);
        out = this.register().addComponent(el);
      } else {
        out = this.registerObject(params);
      }
    }
    return out;
  }
  //private
  registerObject(com:Object){
    //  _.assign(object, objectFunctions);
    let object = {};
    // if(!object){
    //   throw new Error('object undefined');
    // }
    for(let key of _.keys(objectFunctions)){
      if(typeof objectFunctions[key] == 'function'){
          object[key] = objectFunctions[key].bind(object);
      }else{
        object[key] = _.clone(objectFunctions[key]);
      }
    }
    object.engine = this;
    this.objects.push(object);
    if(com){
      object.addComponent(com);
      return com;
    }else{
      return object;
    }


  }
  reset(){
    this.objects = [];
  }

  destroy(obj:Object){
    if(obj.object){
      obj = obj.object;
    }
    // for(let obj in this.objects){
    const ind = this.objects.indexOf(obj);
    if(ind>-1)
      this.objects.splice(ind, 1);
    // }
  }

  getComponent(name:string){
    for(let obj of this.objects){
      const com = obj.getComponent(name);
      if(com){
        return com;
      }
    }
  }
  getComponents(name:string){
    let out = [];
    for(let obj of this.objects){
      let com = obj.getComponent(name);
      if(com){
        out.push(com);
      }
    }
    return out;
  }
  notify(func:Object){
    for(let obj of this.objects){
      obj.notify(func);
    }
  }
}

Imagine.Collider = Collider
Imagine.Element = Element;
Imagine.FPS = require('./component/FPS');
Imagine.Time = Time;
Imagine.Input = Input;

window.Imagine = Imagine;
module.exports = Imagine;
