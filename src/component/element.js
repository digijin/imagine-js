const utils = require('../imagine/utils');

module.exports = class Element {
  constructor(el){
    if(!utils.isElement(el)){
      throw new Error('Not a HTML object');
    }
    this.type = 'element';
    this.tags = ['element'];
    this.raw = el;
    this.raw.getLocalRect = this.getLocalRect;
    this.raw.move = this.move;
    this.raw.moveTo = this.moveTo;
  }
  getLocalRect(){
    let rect = this.raw.getBoundingClientRect();
    let parent = this.raw.parentNode;
    if(parent){
      parent = parent.getBoundingClientRect();
      rect = {
        right: rect.right - parent.right,
        bottom: rect.bottom - parent.bottom,
        top: rect.top - parent.top,
        left: rect.left - parent.left,
        height: rect.bottom - parent.top,
        width: rect.right - parent.left,
      };
    }
    return rect;
  }
  posInit(){
    this._pos = {
      left: this.raw.offsetLeft,
      top: this.raw.offsetTop
    }
  }
  getPosition(){
    if(!this._pos) this.posInit();
    return this._pos;
  }
  setPosition(x, y){
    this._pos = {'left':x, 'top':y};
    this.raw.style.top = y+"px";
    this.raw.style.left = x+"px";
    return this;
  }
  moveTo(x, y){
    return this.setPosition(x, y);
  }
  move(x, y){
    const pos = this.getPosition();
    this.setPosition(pos.left+x, pos.top+y);
  }
};
