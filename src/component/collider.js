

module.exports = class Collider{
  constructor(){
    this.ignoreSides = [];
    this.type = 'collider';
    this.tags = ['collider'];
    this.isTrigger = false;
  }
  start(){
    this.element = this.getComponent('element');
  }
  move(x, y){
    let pos = this.element.raw.getBoundingClientRect();

    check = {
      top: pos.top,
      right: pos.right,
      bottom: pos.bottom,
      left: pos.left,
    }
    if(y<0){
      check.top +=y;
    }else{
      check.bottom += y;
    }
    if(x<0){
      check.left +=x;
    }else{
      check.right += x;
    }
  }
}
