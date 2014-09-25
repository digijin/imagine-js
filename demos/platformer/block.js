(function() {
  window.Block = function() {
    return {
      name: 'block',
      die: function() {
        var el;
        el = this.getComponent('element');
        Imagine.destroy(this);
        return Imagine(el).addComponent(Dying());
      }
    };
  };

}).call(this);
