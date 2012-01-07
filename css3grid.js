(function($) {
  
  /**
   * Constructor
   */
  this.CSS3Grid = function(container) {
    this.maxXRotation = 60; // 60 will result in 30 degrees rotation in both directions.
    this.maxYRotation = 60;

    this.container = $(container);
    this.container.data('css3grid', this);

    this.containerWidth = this.container.width();
    this.containerHeight = this.container.height();

    var self = this;
    $(document.body).mousemove(function(e) {
      self.mousemove(e);
    });
  };

  this.CSS3Grid.prototype = {
    mousemove: function(e) {
      var position = this.container.offset();

      var relativeX = e.pageX - position.left;
      var relativeY = e.pageY - position.top;
      var xPercentage = 1 - Math.min(1, Math.max(0, (relativeX / this.containerWidth)));
      var yPercentage = Math.min(1, Math.max(0, (relativeY / this.containerHeight)));
      
      var yDegrees = this.maxXRotation * xPercentage - this.maxXRotation / 2;
      var xDegrees = this.maxYRotation * yPercentage - this.maxYRotation / 2;
      
      this.container.find('> div').css('webkitTransform', 'rotateX(' + xDegrees + 'deg) rotateY(' + yDegrees + 'deg)');
    }
  };

  $(function() {
    $.each($('.css3grid'), function() {
      new CSS3Grid(this);
    });
  })

})(jQuery);