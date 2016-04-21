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
}

module.exports = class Input{
  constructor(){
    this.keyStatus = {};
    this.keyChanging = {};
    this.keyChanged = {};
    this.defaults = defaults;
    this.config = _.clone(this.defaults);
    this.axes = this.config.axes;
    this.mapping = this.config.mapping;
    utils.addEvent(document, 'keypress', (e) => {
      keyCode = e.keyCode ? e.keyCode : e.charCode;
      this.keypress(keyCode);
    });
    utils.addEvent(document, 'keyup', (e) => {
      keyCode = e.keyCode ? e.keyCode : e.charCode;
      this.keyup(keyCode);
    });
    utils.addEvent(document, 'keydown', (e) => {
      keyCode = e.keyCode ? e.keyCode : e.charCode;
      this.keydown(keyCode);
    });

  }
  keypress(keyCode){/*unused*/}
  keyup(keyCode){/*unused*/}
  keydown(keyCode){/*unused*/}
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
    let pos = this.isDown(this.axes[axis].positive);
    let neg = this.isDown(this.axes[axis].negative);
    return (pos?1:0) + (neg?-1:0);
  }
  update(){
    this.keyChanged = this.keyChanging;
    this.keyChanging = {};
  }

  addAxis(axisName, axis){
    this.axes[axisName] = axis;
  }

}
