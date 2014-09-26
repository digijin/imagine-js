(function() {
  window.Announce = function(msg) {
    return {
      start: function() {
        return $('#wrapper').append('<div class="announce">' + msg + '</div>');
      }
    };
  };

}).call(this);
