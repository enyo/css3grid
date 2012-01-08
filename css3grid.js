(function($) {
  
  /**
   * Constructor
   */
  this.CSS3Grid = function(container, options) {
    this.initialize(container, options);
  };

  this.CSS3Grid.prototype = {
    initialize: function(container, options) {
      this.maxXRotation = 60; // 60 will result in 30 degrees rotation in both directions.
      this.maxYRotation = 60;

      this.container = $(container);
      this.container.data('css3grid', this);

      this.cells = this.container.find('> .cells > .cell');

      $.each(this.cells, function() {
        // Go through all cells, and remove the content.
        // It will be added again as soon as the content is shown.
        var cell = $(this);
        cell.data('content', cell.find('> .content').html());
        cell.find('> .content').empty();
      });

      var self = this;
      $(window).load(function() {
        self.fullyLoaded();
      })
    },
    fullyLoaded: function() {
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
    },
    positionCells: function() {
      this.container.height(this.container.height()); // Making sure the container has the actual height set.

      var self = this;
      $.each(this.cells, function(i) {
        var cell = $(this);
        
        cell.data('initialWidth', cell.width());
        cell.data('initialHeight', cell.height());
        
        var position = cell.position();

        setTimeout(function() {
          // Has to be delayed because it messes with position()
          cell.width(cell.data('initialWidth'));
          cell.height(cell.data('initialHeight'));
        }, 1);

        cell.css({
          left: position.left + 'px', 
          top: position.top + 'px'
        });
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
      $.each(this.cells, function() {
        var cell = $(this);
        cell.click(function() {
          self.cellClick(cell);
        });
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
      cell.addClass('focused transitioning');
      this.container.addClass('cell-focused');
      this.tilt(0, 0);
      cell.one('webkitTransitionEnd', function() {
        cell.addClass('completed-transition').removeClass('transitioning');
        cell.find('> .content').html(cell.data('content'));
      });
    },
    unfocusCell: function() {
      var cell = this.focusedCell;
      cell.removeClass('completed-transition focused').addClass('transitioning');

      cell.find('> .content').empty();
      cell.width(this.focusedCell.data('initialWidth'));
      cell.height(this.focusedCell.data('initialHeight'));

      this.container.removeClass('cell-focused');
      this.focusedCell = undefined;
      this.tilt(this.xDegrees, this.yDegrees);

      cell.one('webkitTransitionEnd', function() {
        cell.addClass('completed-transition').removeClass('transitioning');
      });
    }
    
  };


  $(function() {
    $.each($('.css3grid'), function() {
      new CSS3Grid(this);
    });
  });

})(jQuery);