
module.exports = class Mouse {
  constructor(){
    this.attachListeners();
  }

  attachListeners() {
    document.addEventListener('mousedown', this.mousedown);
  }
  mousedown(e){
  }
  mouseup(e){
  }
};
