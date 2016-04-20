const _ = require('lodash');
module.exports = {
  components: [],
  tags: [],
  addComponent: function(com) {
      if(!com){
        throw new Error('component undefined');
      }
      com.object = this; //add reference
      for(let key of _.keys(this)){ //copy bound functions for convenience
        if(typeof this[key] === 'function'){
          com[key] = this[key];
        }
      };
      this.components.push(com);
      if(com.start) com.start();
      return com;
  },
  getComponent: function(type){
    for(let i in this.components){
      let com = this.components[i];
      if(com.type === type){
        return com;
      }
    }
  },
  addTag: function(tag){
    this.tags.push(tag);
  },
  hasTag: function(tag){
    return (this.tags.indexOf(tag) > -1) ? true:false;
  },
  removeTag: function(tag){
    let ind = this.tags.indexOf(tag);
    if(ind >-1){
      this.tags.splice(ind, 1);
    }
  },
  notify: function(func, arg){
    for(let i in this.components){
      let com = this.components[i];
      if(com[func]){
        if(typeof com[func] === 'function'){
          com[func].apply(com, [arg]);
        }
      }
    }
  }
};
