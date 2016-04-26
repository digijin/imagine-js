

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
    };
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
        // console.log(coll.object.components);
        let el = coll.getComponent('element');
        if(this.element){
          // console.log(el);
          let obj = el.raw.getBoundingClientRect();
          if(this.compareSquares(check, obj)){
            let collision = {
              side: [],
              collider: coll
            };
            let height = pos.height || (pos.bottom - pos.top);
            let width = pos.width || (pos.right - pos.left);
            if((pos.bottom <= obj.top) && (check.bottom > obj.top) && (coll.ignoreSides.indexOf("top")===-1)){

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
    for(let coll of collisions){
      this.notify('onCollision', coll);
      let side = coll.side.map(function(obj){
        switch(obj){
          case 'left':
            return 'right';
          case 'right':
            return 'left';
          case 'top':
            return 'bottom';
          case 'bottom':
            return 'top';
        }
        coll.collider.notify('onCollision', {
          side: side,
          collider: this
        });
      });
    }
    // console.log(collisions);
    switch(collisions.length){
      case 0:
        return false;
      case 1:
        return collisions[0];
      default:
        let side = collisions.map(function(i){
          return i.side[0];
        });
        return {
          side: side,
          collisions: collisions
        }
    }
    return;

  }

  collidesWith(obj){
    let myrect = this.element.raw.getBoundingClientRect();
    let obrect = obj.getBoundingClientRect();
    return this.compareSquares(myrect, obrect);
  }

  compareSquares(sq1, sq2){
    let outsideH = (sq1.bottom <= sq2.top) || (sq2.bottom <= sq1.top);
    let outsideV = (sq1.right <= sq2.left) || (sq2.right <= sq1.left);
    return !outsideV && !outsideH;
  }
};
