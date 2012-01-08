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

    this.positionCells();

    var self = this;
    $(document.body).mousemove(function(e) {
      self.mousemove(e);
    });
    this.attachClickObservers();
    
    this.container.removeClass('loading');
    this.tilt(-10, -10);
  };

  this.CSS3Grid.prototype = {
    positionCells: function() {
      this.container.height(this.container.height()); // Making sure the container has the actual height set.
      var cells = this.container.find('> .cells > .cell');

      var self = this;
      $.each(cells, function(i) {
        var cell = $(this);
        
        cell.data('initialWidth', cell.width());
        cell.data('initialHeight', cell.height());
        
        var position = cell.position();

        setTimeout(function() {
          // Has to be delayed because it messes with position()
          cell.width(cell.data('initialWidth'));
          cell.height(cell.data('initialHeight'));
        }, 1);

        cell.css({ left: position.left + 'px', top: position.top + 'px' });
      });
      this.container.addClass('positioned-cells');
    },
    mousemove: function(e) {
      var position = this.container.offset();

      var relativeX = e.pageX - position.left;
      var relativeY = e.pageY - position.top;
      var xPercentage = 1 - Math.min(1, Math.max(0, (relativeX / this.containerWidth)));
      var yPercentage = Math.min(1, Math.max(0, (relativeY / this.containerHeight)));

      this.yDegrees = this.maxXRotation * xPercentage - this.maxXRotation / 2;
      this.xDegrees = this.maxYRotation * yPercentage - this.maxYRotation / 2;

      if (!this.focusedCell) {
        this.tilt(this.xDegrees, this.yDegrees);
      }
    },
    tilt: function(xDegrees, yDegrees) {
      this.container.find('> div').css('webkitTransform', 'rotateX(' + xDegrees + 'deg) rotateY(' + yDegrees + 'deg)');
    },
    attachClickObservers: function() {
      var self = this;
      $.each(this.container.find('> .cells > .cell'), function() {
        var cell = $(this);
        cell.click(function() { self.cellClick(cell); });
      });
    },
    cellClick: function(cell) {
      if (!this.focusedCell) this.focusCell(cell);
      else this.unfocusCell();
    },
    focusCell: function(cell) {
      this.focusedCell = cell;
      cell.width(this.container.width());
      cell.height(this.container.height());
      cell.addClass('focused');
      this.container.addClass('cell-focused');
      this.tilt(0, 0);
    },
    unfocusCell: function() {
      this.focusedCell.width(this.focusedCell.data('initialWidth'));
      this.focusedCell.height(this.focusedCell.data('initialHeight'));
      this.focusedCell.removeClass('focused');
      this.container.removeClass('cell-focused');
      this.focusedCell = undefined;
      this.tilt(this.xDegrees, this.yDegrees);
    }
    
  };

  $(window).load(function() {
    $.each($('.css3grid'), function() {
      new CSS3Grid(this);
    });
  })

})(jQuery);