'use strict';

const utils = require('./imagine/utils.js');
const objectFunctions = require('./imagine/object.js');
const _ = require('lodash');
const Element = require('./component/element.js');
const Time = require('./imagine/time');
const Input = require('./imagine/input');

class Imagine {
  constructor(params) {
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
        if(comp.update) comp.update();
      }
    }
  }
  // enable object to be tracked by Imagine
  register(params) {
    if (utils.isArray(params)) {
      let i = 0;

      while (i < params.length) {
        this.register(params[i]);//recurse
        i++;
      }
    } else {

      if (utils.isElement(params)) {
        let el = new Element(params);
        var out = this.register().addComponent(el);
      } else {
        var out = this.registerObject(params);
      }
    }
    return out;
  }
  //private
  registerObject(com){
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

  destroy(obj){
    if(obj.object){
      obj = obj.object;
    }
    // for(let obj in this.objects){
    const ind = this.objects.indexOf(obj);
    if(ind>-1)
      this.objects.splice(ind, 1);
    // }
  }

  getComponent(name){
    for(let obj of this.objects){
      const com = obj.getComponent(name);
      if(com){
        return com;
      }
    }
  }
  getComponents(name){
    let out = [];
    for(let obj of this.objects){
      let com = obj.getComponent(name);
      if(com){
        out.push(com);
      }
    }
    return out;
  }
  notify(func){
    for(let obj of this.objects){
      obj.notify(func);
    }
  }
}
Imagine.Collider = require('./component/collider');
window.Imagine = Imagine;
module.exports = Imagine;
