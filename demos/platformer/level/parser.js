(function() {
  window.levelparser = {
    parse: function(str) {
      var block, layer, layers, out, x, y, _i, _j, _len, _len1;
      out = [];
      layers = str.split('\n');
      y = 0;
      for (_i = 0, _len = layers.length; _i < _len; _i++) {
        layer = layers[_i];
        x = 0;
        for (_j = 0, _len1 = layer.length; _j < _len1; _j++) {
          block = layer[_j];
          if (!out[x]) {
            out.push([]);
          }
          out[x].push(parseInt(block));
          x++;
        }
        y++;
      }
      return out;
    }
  };

}).call(this);
