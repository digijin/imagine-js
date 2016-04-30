
// just a simple fps counter
class FPS {
  constructor(){
    this.lastFPS = [];
  }

  // update loop
  update() {

    this.lastFPS.push(1/Imagine.time.deltaTime);


    if (this.lastFPS.length > 50) {
      let fps = 0;
      for (let i = 0; i < this.lastFPS.length; i++) {
        let reading = this.lastFPS[i];
        fps += reading;
      }
      fps = Math.floor(fps / this.lastFPS.length);

      this.lastFPS = [];

      return this.getComponent('element').raw.innerHtml = fps + "FPS";
    }
  }
};

module.exports = FPS;
