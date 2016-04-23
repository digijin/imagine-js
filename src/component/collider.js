

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

    let check = {
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
    let colls = this.object.engine.getComponents('collider');
    let collisions = [];
    for(let coll of colls){
      if(this !== coll){
        let el = coll.getComponent('element');
        if(element){
          let obj = el.raw.getBoundingClientRect();
          if(this.compareSquares(check, obj)){
            collision = {
              side: [],
              collider: coll
            };
            let height = pos.height || pos.bottom - pos.top;
            let width = pos.width || pos.right - pos.left;
            if(pos.bottom <= obj.top && check.bottom > obj.top && !(coll.ignoreSides.indexOf("top")>=-1)){

              if(!this.isTrigger||coll.isTrigger){
                y = (obj.top - height) - check.top;
              }
              collision.side.push('top');
            }else if (obj.bottom <= pos.top && check.top < obj.bottom && !(coll.ignoreSides.indexOf("bottom")>=-1)) {
              if(!this.isTrigger||coll.isTrigger){

                y = (obj.bottom) - pos.top;
              }
              collision.side.push('bottom');
            }
            ///
            if(pos.right <= obj.left && check.right > obj.left && !(coll.ignoreSides.indexOf("left")>=-1)){
              if(!this.isTrigger||coll.isTrigger){
                y = (obj.left - width) - check.left;
              }
              collision.side.push('top');
            }else if (obj.right <= pos.left && check.left < obj.right && !(coll.ignoreSides.indexOf("right")>=-1)) {
              if(!this.isTrigger||coll.isTrigger){
                y = (obj.bottom) - pos.left;
              }
              collision.side.push('right');
            }

            if(collision.side.length > 0){
              collisions.push(collision);
            }

          }
        }
      }
    }
    this.element.move(x, y);

  }
}
