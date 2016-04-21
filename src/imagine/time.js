module.exports = class Time{

  constructor(){
    this.init();
  }

  init(){
    let d = new Date();
    this.paused = false;
    this.deltaTime = 0;
    this.currentTime = 0;
    this.lastTime = d.getTime();
    this.startTime = this.lastTime;
    this.fps = 0;
    this.listeners = [];
  }

  reset(){
    this.init();
  }

  pause(toPause){
    if(toPause === undefined){
      this.paused = !this.paused;
    }else{
      this.paused = toPause;
    }
    if(this.paused){
      this.clearUpdate();
    }else{
      this.setFPS(this.getFPS());
    }
  }

  update(){
    let d = new Date();
    let dt = d.getTime();
    this.currentTime = dt - this.startTime;
    this.deltaTime = (dt - this.lastTime) / 1000;
    this.lastTime = dt;
    for(let listener of this.listeners){
      listener();
    }
  }

  addListener(func){
    if(typeof func === 'function'){
      this.listeners.push(func);
    }else{
      throw new Error('Listener not a function');
    }
  }

  clearUpdate(){
    clearInterval(this.updateId);
    cancelAnimationFrame(this.updateId);
  }

  setFPS(fps){
    this.clearUpdate();
    this.fps = fps;
    if(this.fps === 0){
      this.frameGap = 0;
      this.updateId = requestAnimationFrame(this.update.bind(this));
    }else{
      this.frameGap = 1000 / this.fps;
      this.updateId = setInterval(this.update.bind(this), this.frameGap);
    }
  }

  getFPS(){
    return this.fps;
  }
};
