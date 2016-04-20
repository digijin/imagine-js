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
  getComponent: function(){},
  addTag: function(){},
  getTag: function(){},
  hasTag: function(){},
  removeTag: function(){},
  notify: function(){}
};
