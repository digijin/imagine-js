(function() {
  window.Announce = function(msg) {
    return {
      start: function() {
        console.log(msg);
        return $('#wrapper').append('<div class="announce">' + msg + '</div>');
      }
    };
  };

}).call(this);
