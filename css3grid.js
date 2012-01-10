(function($) {
  
  /**
   * Constructor
   */
  this.CSS3Grid = function(container, options) {
    this.initialize(container, options);
  };

  this.CSS3Grid.prototype = {
    defaultOptions: {
      contentWidth: null, // If null, the css3grid container width & height are taken.
      contentHeight: null
    },
    initialize: function(container, options) {
      this.options = $.extend(this.defaultOptions, options || {});
      
      this.maxXRotation = 60; // 60 will result in 30 degrees rotation in both directions.
      this.maxYRotation = 60;

      this.container = $(container);
      this.container.data('css3grid', this);

      this.cells = this.container.find('> .cells > .cell');

      this.container.addClass('initializing');

      $.each(this.cells, function() {
        // Go through all cells, and remove the content.
        // It will be added again as soon as the content is shown.
        var cell = $(this);
        var contentElement = cell.find('> .content');
        cell.data('content', contentElement.html());
        contentElement.empty();
      });

      var self = this;
      $(window).load(function() {
        self.fullyLoaded();
      })
    },
    fullyLoaded: function() {
      this.containerWidth = this.container.width();
      this.containerHeight = this.container.height();

      if (!this.options.contentWidth) this.options.contentWidth = this.containerWidth;
      if (!this.options.contentHeight) this.options.contentHeight = this.containerHeight;

      this.positionCells();
      var self = this;
      setTimeout(function() { self.container.removeClass('initializing'); }, 1);

      var self = this;
      $(document.body).mousemove(function(e) {
        self.mousemove(e);
      });
      this.attachClickObservers();

      if (window.DeviceOrientationEvent && navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        window.addEventListener('deviceorientation', function(e) { self.devicemove(e); }, true);
      }

      this.container.removeClass('loading');
      this.tilt(-10, -10);
    },
    positionCells: function() {
      this.container.height(this.containerHeight).width(this.containerWidth); // Making sure the container has the actual height set.
      this.container.find('> .cells').height(this.containerHeight).width(this.containerWidth); // Making sure the container has the actual height set.

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

        cell.data('positionedTop', position.top);
        cell.data('positionedLeft', position.left);
      
        self.positionCell(cell);

        // Now set the initial dimensions of the content element
        var contentElement = cell.find('> .content');
        contentElement.data('initialWidth', contentElement.width());
        contentElement.data('initialHeight', contentElement.height());
        contentElement.css({ width: 'auto', height: 'auto' });

      });
      this.container.addClass('positioned-cells');
    },
    positionCell: function(cell) {
      cell.css({
        left: cell.data('positionedLeft') + 'px', 
        top: cell.data('positionedTop') + 'px'
      });
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
    devicemove: function(e) {
      // Beta: 90 is a complete vertical device.
      // The normal motions are between 80 and 15. So lets make those the max rotation degrees.
      
      var minBeta = 15, maxBeta = 80;
      var beta = Math.max(minBeta, Math.min(maxBeta, e.beta)) - minBeta;

      beta = -(beta / ((maxBeta - minBeta) / 2) - 1);
      
      this.tilt(this.maxXRotation * beta, 0);
      $('#debug').html('alpha: ' + Math.round(e.alpha) + ', beta: ' + Math.round(e.beta) + ', gamma: ' + Math.round(e.gamma));
    },
    tilt: function(xDegrees, yDegrees) {
      this.container.find('> .cells').css('webkitTransform', 'rotateX(' + xDegrees + 'deg) rotateY(' + yDegrees + 'deg)');
    },
    attachClickObservers: function() {
      var self = this;

      $('html').click(function() {
        // Click somewhere on the page.
        self.unfocusCell();
      });

      $(this.container).click(function(event){
        event.stopPropagation();
      });

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
      
      var self = this;
      // Make the cells explode!
      $.each(this.cells, function() {
        var explodingCell = $(this);
        var distanceFromY = explodingCell.data('positionedTop') - cell.data('positionedTop');
        var distanceFromX = explodingCell.data('positionedLeft') - cell.data('positionedLeft');

        var newTop = (explodingCell.data('positionedTop') + distanceFromY / 2) + 'px';
        var newLeft = (explodingCell.data('positionedLeft') + distanceFromX / 2) + 'px';
        explodingCell.css({top: newTop, left: newLeft});
      });
      
      this.focusedCell = cell;
      
      var contentElement = cell.find('> .content');
      
      var cellWidth = contentElement.data('initialWidth') || this.options.contentWidth;
      var cellHeight = contentElement.data('initialHeight') || this.options.contentHeight;
      
      cell.width(cellWidth);
      cell.height(cellHeight);
      cell.css({ top: Math.round((this.containerHeight - cellHeight) / 2) + 'px', left: Math.round((this.containerWidth - cellWidth) / 2) + 'px' });
//      contentElement.width(cellWidth);
//      contentElement.height(cellHeight);
      
      cell.addClass('focused transitioning').removeClass('completed-transition');
      
      this.container.addClass('cell-focused');
      this.tilt(0, 0);
      cell.one('webkitTransitionEnd', function() {
        cell.addClass('completed-transition').removeClass('transitioning');
        contentElement.html(cell.data('content'));
      });
    },
    unfocusCell: function() {
      if (!this.focusedCell) return;

      // Put the cells back at their original positions.
      $.each(this.cells, function() {
        var cell = $(this);
        cell.css({top: cell.data('positionedTop') + 'px', left: cell.data('positionedLeft') + 'px'});
      });
      

      var cell = this.focusedCell;
      cell.removeClass('completed-transition focused').addClass('transitioning');

      cell.find('> .content').empty();
      cell.width(this.focusedCell.data('initialWidth'));
      cell.height(this.focusedCell.data('initialHeight'));

      this.positionCell(cell);

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