module.exports = {
  addComponent: function(com) {
      if(!com){
        throw new Error('component undefined');
      }
      com.object = this;
      return com;
  },
  getComponent: function(){},
  addTag: function(){},
  getTag: function(){},
  hasTag: function(){},
  removeTag: function(){},
  notify: function(){}
};
