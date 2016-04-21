const utils = require('./utils');
const _ = require('lodash');

const defaults = {
  axes:{
    Horizontal:{
      positive: "right",
      negative: "left"
    },
    Vertical:{
      positive: "up",
      negative: "down"
    }
  },
  mapping:{
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    shift: 16,
    enter: 13,
    ctrl: 17,
    escape: 27
  }
};

module.exports = class Input{
  constructor(){
    this.keyStatus = {};
    this.keyChanging = {};
    this.keyChanged = {};
    this.defaults = defaults;
    this.config = _.clone(this.defaults);
    this.axes = this.config.axes;
    this.mapping = this.config.mapping;
    this.listeners = [];
    // utils.addEvent(document, 'keypress', (e) => {
    //   keyCode = e.keyCode ? e.keyCode : e.charCode;
    //   this.keypress(keyCode);
    // });
    utils.addEvent(document, 'keyup', (e) => {
      let keyCode = e.keyCode ? e.keyCode : e.charCode;
      this.keyup(keyCode);
    });
    utils.addEvent(document, 'keydown', (e) => {
      let keyCode = e.keyCode ? e.keyCode : e.charCode;
      this.keydown(keyCode);
    });

  }

  addListener(func){
    if(typeof func === 'function'){
      this.listeners.push(func);
    }else{
      throw new Error('Listener not a function');
    }
  }

  notify(params){
    for(let listener of this.listeners){
      listener.apply(null, params);
    }
  }

  keyup(keyCode){
    keyCode = this.map(keyCode);
    this.keyStatus[keyCode] = false;
    this.keyChanging[keyCode] = "up";
    this.notify(['onKeyUp', keyCode]);
  }
  keydown(keyCode){
    keyCode = this.map(keyCode);
    let firstdown = false;
    if(this.keyStatus.hasOwnProperty(keyCode)){
      if(this.keyStatus[keyCode] !== true){
        firstdown = true;
        this.keyChanging[keyCode] = "down";
      }
    }else{
      firstdown = true;
      this.keyChanging[keyCode] = "down";
    }
    if(firstdown){
      //notify
      this.notify(['onKeyDown', keyCode]);
    }
    this.keyStatus[keyCode] = true;

  }
  reset(){
    this.keyStatus = {};
    this.keyChanging = {};
    this.keyChanged = {};
  }
  map(key){
    if(typeof key === 'number') return key;
    if(this.mapping.hasOwnProperty(key)) return this.mapping[key];
    return parseInt(key);
  }
  getKey(keyCode){
    keyCode = this.map(keyCode);
    if(this.keyStatus.hasOwnProperty(keyCode)) return this.keyStatus[keyCode];
    return false;
  }
  getKeyDown(keyCode){
    keyCode = this.map(keyCode);
    if(this.keyChanged.hasOwnProperty(keyCode)){
      if(this.keyChanged[keyCode] === 'down'){
        return true;
      }
    }
    return false;
  }
  getKeyUp(keyCode){
    keyCode = this.map(keyCode);
    if(this.keyChanged.hasOwnProperty(keyCode)){
      if(this.keyChanged[keyCode] === 'up'){
        return true;
      }
    }
    return false;
  }

  getAxis(axis){
    let pos = this.getKey(this.axes[axis].positive);
    let neg = this.getKey(this.axes[axis].negative);
    return (pos?1:0) + (neg?-1:0);
  }
  update(){
    this.keyChanged = this.keyChanging;
    this.keyChanging = {};
  }

  addAxis(axisName, axis){
    this.axes[axisName] = axis;
  }

};
